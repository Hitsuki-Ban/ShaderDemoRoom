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

1. **合法な光源ドメインを先に確定**: 球中心 C=(0,1.25,0)、半径 r=1.35 なので球頂は y=2.60。`lightY` domain を **2.61..6.00** に変更し、defaults / Focus preset をこの範囲で再較正する。入射方向は**垂直オフセット照準**(2026-07-20 裁定 — 下記「照準ルールの数学的矛盾と裁定」参照)で構築する: 目標 impact parameter を `p = 0.6 × GLASS_RADIUS`、`d = |C−s|`、`u = normalize((C−s) × worldUp)` とし(C−s が worldUp と平行な垂直整列時は決定論的に +X 軸を u とする)、照準点を `Q = C + q·u`、`q = p·d / sqrt(d²−p²)`、入射方向を `direction = normalize(Q−s)` とする。これによりすべての合法光源位置で球中心から入射レイまでの最短距離が p となり、入射角が一定の斜入射(θ = arcsin(p/r) = arcsin(0.6) ≈ 36.9°)になる。入力光源が球内・球面上、数値が非有限、または交差不能なら明示的な invalid/no-hit を返し、照準補正や別経路へ切り替えない(垂直整列時の +X 規則は退化回避の照準補正ではなく、仕様で固定された決定論的定義である)。
2. **URL schema v2 へ明示升版**: `URL_STATE_VERSION` を `1` から `2` へ上げ、変更後 domain と presets の round-trip を v2 で固定する。v1 URL の読み替え、値クランプ、旧 lightY の補正、version alias は実装せず、不一致 version は既存契約どおり拒否する。
3. **レイ-球交差**: レイ `p(t) = s + v t` と球で二次方程式を解き、小さい正根を入射点 P₁ とする。判別式 < 0、正根なし、または接線近傍の不安定値は no-hit とし、NaN を生成せず描画側へ明示する。
4. **反射**: 入射点法線 `n₁ = (P₁−C)/r` に対し `Vector3.reflect()` を使用。反射ビームの不透明度は Schlick 近似 `F = F₀ + (1−F₀)(1−cosθ)⁵`、`F₀ = ((1−ior)/(1+ior))²` で変調する。
5. **屈折(入射→内部→出射)**: GLSL `refract()` 相当を自前実装(`k = 1 − η²(1−(n·i)²)`)し、k<0 は明示的な total-internal-reflection 結果にする。内部レイの 2 回目交差が出射点 P₂、出射側は η を逆数にして再屈折する。入力 Vector3 は変異させない。
6. **床着地と no-hit**: 出射レイ×床平面 y=0 の交差 `t = −P₂.y / d.y` を着地点とする。`d.y >= 0` または `t <= 0` は floor no-hit とし、床ビーム、床マーカー、コースティクスを非表示にする。自動照準や仮の床点を生成しない。
7. **固定トポロジー・更新時ゼロアロケーション**: ビームは `InstancedMesh` **2 draw** に固定する(core batch 1 + glow batch 1)。各 batch は incoming / reflected / internal / outgoing の4 instanceを起動時に確保し、設定更新は instance matrix / instance color の既存 buffer だけを書き換える。invalid/no-hit 区間は scale 0 とし、mesh の追加・削除や visibility 分岐で draw topology を変えない。`updateLightPath()` 内で Geometry / BufferAttribute / Vector3 / 配列を new せず、dispose+再生成を廃止する。現行の beam 6 draws を2 drawsへ置換するため、シーン総 draw calls は **19 → 15** とする。
8. **dirty-check**: lightX/Y/Z・ior・beamSpread が変わった場合だけ物理経路とビーム transform を更新する。roughness / thickness / showCaustics だけの patch では経路計算も transform 書き込みも行わない。

## 受け入れ基準

- **数値基準(挙動テスト)**: (1) `|P₁ − C| ≈ 1.35` / `|P₂ − C| ≈ 1.35`、(2) floor hit 時 y ≈ 0、(3) ior 1.0→2.4 で屈折角が単調に変化し ior=1.0 で直進、(4) 反射ベクトルが `Vector3.reflect` と一致、(5) 非有限/球内/交差不能入力が invalid/no-hit になり fallback 座標を返さないこと、(6) 全合法光源位置で入射角が arcsin(0.6)±ε に一定であること、(7) `tir-entry` / `tir-exit` は ior≥1 の球ジオメトリでは幾何学的に到達不能のため、**合法入力では発火しない**ことをテストで固定する(防御ステータスとしてコードには維持)— 以上を vitest で固定する。
- **ドメイン・URL**: `lightY` が 2.61..6.00 で、defaults/presets が範囲内であること。v2 URL の全設定 round-trip が通り、v1 と範囲外 lightY は拒否されること。
- **視覚基準**: デフォルト・Focus beam・Crystal preset・合法な極端配置(lightX=−6 / lightY=2.61 / lightZ=−6)の各キャプチャで、入射ビームが球表面で終端し、マーカーが表面/床上にあり、屈折が入射時に法線側へ曲がること。
- **応答性**: IOR スライダー操作で屈折ビームの角度・着地点・コースティクス位置が目視で明確に変化すること(現行の「セグメント長の微妙な変化のみ」からの脱却をビフォー/アフター動画またはキャプチャ列で記録)。
- **ゼロアロケーション**: lightX を 3 秒連続変化させても telemetry の geometries が一定で、heap allocation sampling に Geometry / BufferAttribute / Vector3 の update tick 生成がないこと。roughness-only patch で経路 API 呼び出しと transform 書き込みが 0 回であること。
- **回帰なし**: core/glow の2つの `InstancedMesh` とシーン総 draw calls **15** を gate に固定し、FPS が T-GO-01 hardware 基線から ±5% 以内、`pnpm qa:visual` 通過。
- **プリセット再検分**: `glassOpticsFocusPreset` / `glassOpticsCrystalPreset`(`state.ts:33-45`)の構図が新経路で成立するよう値を再調整し、キャプチャで承認を得ること。

## 影響範囲・注意

- **挙動テストの書き換え**: `runtime.test.ts:40-53` は旧フェイク仕様(refractedB.y=0.04、中点 caustics)を固定しているため、上記の物理性テストへ全面置換する。テスト更新は本チケットのスコープに含める。
- **T-GO-01 との境界**: T-GO-01 は renderer/transmission 性能だけを所有する。本票が `updateBeamGeometry` / `createTubeGeometry` と物理経路を一括置換する。
- **beamSpread の意味**: 現行のビーム束/コースティクス集束度という意味を維持する。分散量には使わず、T-GO-05 の新しい `dispersion` フィールドと独立させる。
- **旧 URL 非互換**: domain 変更は明示的な schema v2 で表現する。旧 URL の互換読み出しや移行メッセージは本票の要件ではないため追加しない。

## 照準ルールの数学的矛盾と裁定(2026-07-20、ユーザー決定)

**矛盾の内容**: 当初仕様の「入射方向は光源から明示的な球中心ターゲットへ向けて構築する」は、球中心を通るレイが必ず**法線入射**(入射点で `n₁ ∥ direction`、θ=0)になるため、(a) 屈折がどの IOR でも一切曲がらず(sin θ_t = sin 0 / η = 0 — 内部コードは中心を通り対蹠点から直進)、受け入れ基準「ior 1.0→2.4 で屈折角が単調変化」「IOR スライダーで着地点・コースティクスが目視で明確に変化」と**両立不可能**、(b) 反射ビームが入射ビームと同一直線上を光源へ逆走し可視化として退化する。副次的発見として、`tir-entry` は ior≥1 の疎→密入射で原理的に発生せず、`tir-exit` も球の弦対称性(sin θ_out = η·sin θ_t = sin θ_in ≤ 1)により幾何学的に到達不能 — 両ステータスは防御コードとしてのみ意味を持つ。

**裁定: 垂直オフセット照準を採用**(改善方向1に反映済み)。目標 impact parameter を `p=0.6r` とし、`u = normalize((C−s) × worldUp)`(垂直整列時は +X)、`d=|C−s|`、`q=p·d/sqrt(d²−p²)`、`Q=C+q·u`、`direction=normalize(Q−s)` とする。固定 `Q=C+0.6r·u` では有限距離の source に対する実 impact parameter が `d·0.6r/sqrt(d²+(0.6r)²)` となり一定角を満たさないため、上記の q で補正した。全合法光源位置で入射角 arcsin(0.6) ≈ 36.9° の斜入射が保証され、IOR の屈折変化が常に可視、反射ビームも入射と分離する。対案の「固定オフセット照準点」は光源・照準点・中心が一直線に並ぶ合法配置(例: 真上 lightX=lightZ=0)で法線入射に退化するため不採用。受け入れ基準に (6) 入射角一定 と (7) TIR 防御ステータスの合法入力非発火 を追加し、TIR の実演を要求しないことを明確化した。

実装補足: `light-path.ts` は source / incidentDirection を別入力に取る方向非依存の tracing API を維持し、同モジュールの `calculateGlassAimDirectionInto` が本仕様の照準方向を既存出力 buffer へ構築する。runtime はその方向を tracing API へ明示的に渡す。

## 作業報告 (2026-07-20)

- PR: [#31](https://github.com/Hitsuki-Ban/ShaderDemoRoom/pull/31)、物理実装 revision: `d22970cb404349460799d77ed0ee5c5e21e9c492`。
- `light-path.ts` に有限光源の固定 impact 照準、安定な ray/sphere 交差、`Vector3.reflect()`、Schlick 反射率、2 界面の Snell 屈折、明示 TIR/no-hit、床交差を実装した。合法 domain 40,625 組の独立走査では unexpected/TIR/非有限値 0、impact 最大誤差 `1.22e-15`、球面最大誤差 `6.66e-16`。
- beam を core/glow 各 4 slot の常設 `InstancedMesh` へ置換し、設定 update は既存 matrix/color buffer のみ更新する。全 6 capture で 15 calls、Light X 180 frame 連続操作で calls `15→15`、geometries `26→26`。未圧縮 QA build の heap sampling は positive control を検出した上で `Geometry` / `BufferAttribute` / `Vector3` の update 中生成 0。
- `lightY` を `2.61..6.00` にし default/Focus を再較正、URL schema を v2 へ更新した。v1・範囲外値は clamp/migration なしで拒否する。
- 数値・runtime・URL の 50 targeted tests、全 231 tests、lint、production build、visual smoke、renderer lifecycle を通過。独立 reviewer の初回 2 P2 (aim invalid 出力、圧縮名による heap gate 偽陰性) を修正し、delta review は `APPROVE`。
- 同一 RTX 4070 Ti / Chrome D3D11、5 組交互順序の T-GO-01 baseline 比較は paired median regression `-0.55%` (許容上限 `+5%`)。候補 reference は 15 calls / 5,604 triangles、raw record は `captures/t-go-04-telemetry-2026-07-20.json`。
- 視覚証拠は before、default、Focus、Crystal、合法 extreme、IOR 1.0 / 2.4 を `docs/direction/captures/t-go-04-*.png` に保存した。extreme の物理 floor hit `(x≈6.991, y=0, z≈4.038)` は固定カメラ外になるため数値テストで床面位置を固定し、画面内 capture は入射・表面 P₁/P₂・出射方向を確認する。
