# [T-GO-04] 光路を物理化する(レイ×球交差 + reflect()/refract())

- 分類: TA
- 優先度: P2
- 評価軸: モデル一貫性 / 描画正当性(教育展示としての正しさ)
- 依存: T-GO-01(renderer profile と性能基線を先に確定)。T-GO-03 / T-GO-05 は本チケットの物理経路 API と固定トポロジーを前提とする

## 現状(証拠)

- **入射ターゲットが球の内部にハードコード**: `src/rooms/glass-optics/runtime.ts:95` — `incomingEnd = new Vector3(0, 1.18, 0)`。ガラス球は中心 (0, 1.25, 0)(glassGroup `runtime.ts:226`)・半径 1.35(`IcosahedronGeometry(1.35, 8)`、`runtime.ts:230`)なので、**ターゲットは球面から 1.28 内側の球内部**。入射ビームは表面に接触せず内部で終端し、targetMarker(`runtime.ts:360`)が球内に浮く(dossier リスク 1)。
- **反射が法線反射ではない**: `runtime.ts:97-99` — `reflected = incomingEnd + vec3(-dir.x, abs(dir.y), -dir.z) * 3.6`。成分ミラーフリップのヒューリスティックで、球面法線とは無関係。光がターゲットより下から入る配置や lightZ 負では幾何的に誤った経路を描く。
- **屈折が 2 セグメントのフェイク**: `runtime.ts:100-105` — `refractedA = incomingEnd + direction * (1.4 / ior)`(※ `direction.multiplyScalar` が in-place 変異、dossier リスク 9)、`refractedB = (refractedA.x + beamSpread*2.4, 0.04, refractedA.z - beamSpread*3.2)`。Snell 則と無関係で、**IOR スライダーの見た目の効果は内部セグメント長 1.4/ior(1.4→0.58 world units)の微妙な伸縮のみ**。着地点は形状無関係に常に y=0.04。
- **従属要素がすべてフェイク値に連動**: markers(`runtime.ts:360-362`)、caustics 位置/スケール(`runtime.ts:113-118, 363-364`)が上記ヒューリスティックの出力を参照している。
- **現行テストはフェイク仕様を挙動固定**: `runtime.test.ts:40-53` が `calculateGlassLightPath` の `refractedB.y ≈ 0.04` と caustics 中点計算を expect している(挙動ベース化済みだが、固定しているのは旧仕様)。

## 問題

「屈折の振る舞いを読める教育デモ」というコンセプト(dossier「コンセプト」節)に対し、描かれる光路が物理と無関係のため、光源を動かしたときの応答が嘘になる。ビームが球に触れないままマーカーが宙に浮く様子は、注意深い観客ほど「壊れている」と読む。IOR という主役パラメータの体感効果が乏しい根本原因でもある。

## 改善方向

research-glass-optics.md §2.2 の閉形式計算(すべて CPU/JS、設定更新時のみ実行)と §2.5 の固定トポロジー更新を、1つの物理光路 API として実装する。

1. **合法な光源ドメインを先に確定**: 球中心 C=(0,1.25,0)、半径 r=1.35 なので球頂は y=2.60。`lightY` domain を **2.61..6.00** に変更し、defaults / Focus preset をこの範囲で再較正する。lightX/Z の各範囲でも球へ入射するよう、入射方向は光源から明示的な球中心ターゲットへ向けて構築する。入力光源が球内・球面上、数値が非有限、または交差不能なら明示的な invalid/no-hit を返し、照準補正や別経路へ切り替えない。
2. **URL schema v2 へ明示升版**: `URL_STATE_VERSION` を `1` から `2` へ上げ、変更後 domain と presets の round-trip を v2 で固定する。v1 URL の読み替え、値クランプ、旧 lightY の補正、version alias は実装せず、不一致 version は既存契約どおり拒否する。
3. **レイ-球交差**: レイ `p(t) = s + v t` と球で二次方程式を解き、小さい正根を入射点 P₁ とする。判別式 < 0、正根なし、または接線近傍の不安定値は no-hit とし、NaN を生成せず描画側へ明示する。
4. **反射**: 入射点法線 `n₁ = (P₁−C)/r` に対し `Vector3.reflect()` を使用。反射ビームの不透明度は Schlick 近似 `F = F₀ + (1−F₀)(1−cosθ)⁵`、`F₀ = ((1−ior)/(1+ior))²` で変調する。
5. **屈折(入射→内部→出射)**: GLSL `refract()` 相当を自前実装(`k = 1 − η²(1−(n·i)²)`)し、k<0 は明示的な total-internal-reflection 結果にする。内部レイの 2 回目交差が出射点 P₂、出射側は η を逆数にして再屈折する。入力 Vector3 は変異させない。
6. **床着地と no-hit**: 出射レイ×床平面 y=0 の交差 `t = −P₂.y / d.y` を着地点とする。`d.y >= 0` または `t <= 0` は floor no-hit とし、床ビーム、床マーカー、コースティクスを非表示にする。自動照準や仮の床点を生成しない。
7. **固定トポロジー・更新時ゼロアロケーション**: 4 区間の core/glow を起動時に必要数だけ `CylinderGeometry` で生成し、設定更新は既存 mesh の position/quaternion/scale と visibility のみ変更する。`updateLightPath()` 内で Geometry / BufferAttribute / Vector3 / 配列を new せず、dispose+再生成を廃止する。
8. **dirty-check**: lightX/Y/Z・ior・beamSpread が変わった場合だけ物理経路とビーム transform を更新する。roughness / thickness / showCaustics だけの patch では経路計算も transform 書き込みも行わない。

## 受け入れ基準

- **数値基準(挙動テスト)**: (1) `|P₁ − C| ≈ 1.35` / `|P₂ − C| ≈ 1.35`、(2) floor hit 時 y ≈ 0、(3) ior 1.0→2.4 で屈折角が単調に変化し ior=1.0 で直進、(4) 反射ベクトルが `Vector3.reflect` と一致、(5) 非有限/球内/交差不能入力が invalid/no-hit になり fallback 座標を返さないことを vitest で固定する。
- **ドメイン・URL**: `lightY` が 2.61..6.00 で、defaults/presets が範囲内であること。v2 URL の全設定 round-trip が通り、v1 と範囲外 lightY は拒否されること。
- **視覚基準**: デフォルト・Focus beam・Crystal preset・合法な極端配置(lightX=−6 / lightY=2.61 / lightZ=−6)の各キャプチャで、入射ビームが球表面で終端し、マーカーが表面/床上にあり、屈折が入射時に法線側へ曲がること。
- **応答性**: IOR スライダー操作で屈折ビームの角度・着地点・コースティクス位置が目視で明確に変化すること(現行の「セグメント長の微妙な変化のみ」からの脱却をビフォー/アフター動画またはキャプチャ列で記録)。
- **ゼロアロケーション**: lightX を 3 秒連続変化させても telemetry の geometries が一定で、heap allocation sampling に Geometry / BufferAttribute / Vector3 の update tick 生成がないこと。roughness-only patch で経路 API 呼び出しと transform 書き込みが 0 回であること。
- **回帰なし**: 採用した固定メッシュ数に合わせ draw-call gate を意図的に更新・記録し、FPS が T-GO-01 hardware 基線から ±5% 以内、`pnpm qa:visual` 通過。
- **プリセット再検分**: `glassOpticsFocusPreset` / `glassOpticsCrystalPreset`(`state.ts:33-45`)の構図が新経路で成立するよう値を再調整し、キャプチャで承認を得ること。

## 影響範囲・注意

- **挙動テストの書き換え**: `runtime.test.ts:40-53` は旧フェイク仕様(refractedB.y=0.04、中点 caustics)を固定しているため、上記の物理性テストへ全面置換する。テスト更新は本チケットのスコープに含める。
- **T-GO-01 との境界**: T-GO-01 は renderer/transmission 性能だけを所有する。本票が `updateBeamGeometry` / `createTubeGeometry` と物理経路を一括置換する。
- **beamSpread の意味**: 現行のビーム束/コースティクス集束度という意味を維持する。分散量には使わず、T-GO-05 の新しい `dispersion` フィールドと独立させる。
- **旧 URL 非互換**: domain 変更は明示的な schema v2 で表現する。旧 URL の互換読み出しや移行メッセージは本票の要件ではないため追加しない。
