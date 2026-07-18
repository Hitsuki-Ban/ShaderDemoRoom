# [T-EMB-03] iframe allow 権限をルーム別レジストリ化して最小化する

- 分類: Platform
- 優先度: P2(小粒)
- 評価軸: コントラクト遵守(TA軸)— 最小権限原則への違反。埋め込みコンテンツへ実使用のない権限サーフェスを一律付与している
- 依存: なし(T-EMB-01/02 と独立に実施可能。ただし T-EMB-02 と同一ファイルを編集するため着手順の調整のみ必要 — 本チケット先行を推奨)

## 現状(証拠)

- `src/shared/embedded/EmbeddedExhibitFrame.tsx:26` — 全埋め込みルームに一律 `allow="autoplay; microphone; clipboard-write"` をハードコード。ルーム別の分岐は存在しない。
- `src/rooms/types.ts:115-118` — `EmbeddedRoomDefinition` は `kind: 'embedded'` と `embedPath` のみで、権限を宣言するフィールドがない。
- `src/rooms/registry.ts:63-92` — orb(63-77 行)/ tide(78-92 行)の定義にも権限情報なし。
- **実際の使用状況(ref ソース grep で確認)**:
  - orb(`ref/mizu-kokoro-2-source/src/main.js`): マイクを**使用する**(`navigator.mediaDevices.getUserMedia` 1797-1798 行 — MIC ボタン/キー M のマイク駆動)。CAPTURE は `<a download>` 方式(`link.download = ...` 2221 行)で **clipboard-write は不使用**。音声は WebAudio(SoundField 1785 行)+ `<audio>` 非使用。
  - tide(`ref/archive_of_the_ninth_tide_shoreless_web/src/main.js` および index.html): `getUserMedia` / clipboard 系 API の使用ゼロ(grep で一致なし)— **microphone / clipboard-write とも不使用**。音声は `<audio src=./archive.mp3>`(index.html:358)の再生で autoplay 権限が関わる。
- 資料参照: dossier-anime-liquid-orb.md リスク12(「iframe allow に `clipboard-write` が含まれるが展示は使用しない。microphone 許可は正当に必要」)、dossier-ninth-tide-archive.md リスク10(「iframe allow に 'microphone' — 展示は一切使用しない」)、dossier-shell.md リスク15、review-framework.md ロングリスト AO-8 / NT-10、research-webgl-platform.md §2.8(「registry の RoomDefinition('embedded') に `allow` フィールドを持たせ、部屋ごとに宣言するのが自然な着地。clipboard-write は両者とも不要なら削除」/ web.dev の最小権限原則)。

## 問題

Permissions Policy の最小権限原則(research-webgl-platform.md §2.8)に反し、tide に不要な microphone、両展示に不要な clipboard-write を付与している。GitHub Pages はレスポンスヘッダを設定できないため `allow` 属性が唯一の制御点であり、ここが一律値だと「埋め込みを増やすたびに全展示の権限が最大集合に膨らむ」構造的欠陥になる。実害は現状小さいが、fork 運用で埋め込み展示を今後も調整・追加していく前提の基盤としては今すぐ直すのが最安。

## 改善方向

research-webgl-platform.md §2.8 の提案どおり、宣言をレジストリへ移す(**注: 同資料の初版は orb/tide のマイク使用実態を逆に記載していたため 2026-07-18 に訂正済み。正しい使用実態は本チケットの grep 証拠 — orb が getUserMedia 使用、tide は不使用 — を正とする**):

1. `src/rooms/types.ts` の `EmbeddedRoomDefinition` に権限フィールドを追加する。例: `permissions: readonly EmbeddedPermission[]`(`type EmbeddedPermission = 'autoplay' | 'microphone' | 'fullscreen' | ...` の union で許可トークンを型制約)。自由文字列 `allow: string` より、使用可能トークンを型で閉じる方が「最大集合への逆戻り」をレビューで捕まえやすい。
2. `src/rooms/registry.ts` の各 embedded 定義に実使用ベースの最小宣言を記載:
   - `anime-liquid-orb`: `['autoplay', 'microphone']`(マイク駆動機能あり + WebAudio 起動)
   - `ninth-tide-archive`: `['autoplay']`(音声再生のみ)
   - clipboard-write はどのルームにも宣言しない(orb の CAPTURE は `<a download>` で権限不要 — 証拠節参照)。
3. `EmbeddedExhibitFrame.tsx` はハードコード文字列を廃し、`room.permissions.join('; ')` で `allow` を組み立てる。`allowFullScreen`(属性経路)は現行維持で可(fullscreen をトークン化して統一するかは実装時判断 — orb/tide とも FULL/F キーのフルスクリーン機能があるため機能維持が条件)。
4. `registry.test.ts` に「embedded ルームは permissions を宣言し、許可トークン集合の範囲内である」形状テストを追加し、以後の権限追加が意図的な diff として現れるようにする。

## 受け入れ基準

- DOM 検証: 各ルーム表示時の iframe `allow` 属性が orb = `autoplay; microphone`、tide = `autoplay` であること(DevTools で確認、`clipboard-write` がリポジトリの src/ から grep で消えていること)。
- 機能回帰(権限縮小の無害性実証):
  - orb(埋め込み表示): MIC ボタンでマイク許可プロンプトが出て有効化できる(localhost/HTTPS で確認 — STATIC_README の制約どおり)。声场(SoundField)再生、CAPTURE の PNG ダウンロード、FULL のフルスクリーンが動作。
  - tide(埋め込み表示): 下潜で音声再生が開始し、F キーのフルスクリーンが動作。
  - 両展示のスタンドアロン起動(Open standalone)は iframe 権限と無関係だが、回帰として一巡確認。
- `registry.test.ts` の新規形状テストを含め `pnpm test / lint / typecheck / build` 全パス。`pnpm qa:visual` パス(コンソールエラー0 — 権限剥奪起因の DOMException が出ていないことの検知を兼ねる)。
- 権限宣言の根拠(どの API 使用に対応するか)が registry のコメントまたは docs に1行ずつ記録されている。

## 影響範囲・注意

- **registry.test.ts のピン留め**: 既存テストは embedPath 形状(`^exhibits/.+/index\.html$`、registry.test.ts:26)とルーム id 列をピンしている。permissions フィールド追加はこれらを壊さないが、`satisfies readonly RoomDefinition[]`(registry.ts:93)の型整合と合わせてテスト更新を同一コミットで行うこと。
- **文字列ピン留めテスト(shader-quality.test.ts / runtime.test.ts)・water-qa.mjs セレクタ・renderOrder 連鎖**: いずれもネイティブ2室/描画順の話であり本チケットでは非該当(変更は shell の TSX + 型 + テストのみで、ref/ 側・シェーダーには一切触れない)。
- **T-EMB-02 との編集競合**: `EmbeddedExhibitFrame.tsx` と `types.ts` / `registry.ts` を共有する。本チケットは小粒のため**先行実施を推奨**し、T-EMB-02 側がリベースする(依存関係ではなく順序調整)。
- **将来の権限追加はレジストリ経由のみ**: ブリッジ(T-EMB-02)や新規埋め込み展示が権限を要する場合も `permissions` 宣言に足すこと。EmbeddedExhibitFrame への直書き復活はレビューで却下する運用を明記。
- **autoplay の意味論**: 両展示ともユーザー操作(ボタン/クリック)起点で音声を開始するため、autoplay 削除でも動く可能性はあるが、ブラウザ実装差(iframe 内ジェスチャの委譲仕様)による無音リグレッションのリスクに対して得るものがない。v1 では autoplay は両展示に残す判断とし、その理由を registry コメントに残す。
