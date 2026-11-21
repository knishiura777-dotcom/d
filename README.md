# Web App Library — 授業用QR対応版

GitHub リポジトリ `knishiura777-dotcom/d` の main ブランチで確認した HTML 38個を収録するカタログ（暫定分類）。このZIPに元アプリのHTML本体は含まれません。QRは `https://knishiura777-dotcom.github.io/d/` 以下の公開先URLを指します。

## 公開方法

1. GitHub の `knishiura777-dotcom/d` のルートに `index.html`, `webapps.json`, `qr/` フォルダをアップロードします。
2. GitHub Settings → Pages → Deploy from a branch → main / (root) を選択します。
3. `https://knishiura777-dotcom.github.io/d/` で一覧を確認します。
4. 教室ではページ上部のQRコードを投影して一覧へ誘導します。各カードの「QRを表示」は各アプリへ直接移動するQRです。

**注意:** リポジトリにある既存の `Index.html`（先頭大文字）と新規 `index.html`（小文字）は異なるファイルです。Windows上では同一視される場合があるため、アップロード操作にはご注意ください。

## 日付と内容について

- GitHubファイルのアップロード日時は取得できません。「更新日時を取得」ボタンでファイル単位の最新コミット日をGitHub APIから取得して並べ替えます。APIレート制限により、一部取得できないことがあります。
- 名称と概要はファイル名をもとにした**暫定分類**です。アプリ内容・動作の検証は行っていません。
- 現在のGitHubリポジトリが公開され、Pagesが有効になるまではQRリンクが動作しないことがあります。
- QR PNGは公開先URL固定です。リポジトリ名・公開先URLが変わる場合は再生成が必要です。
- GitHub Pagesでの読み込みは `webapps.json` の参照を必要とします。`file://` でHTMLを直接開くとブラウザのセキュリティ設定で読み込みに失敗する場合があります。

## 将来の更新

GitHubリポジトリにアプリを追加したら、`webapps.json` にレコードを追記し、対応するQR PNGを追加します。将来的にGitHub Actionsで自動再生成する方式に移行可能です。
