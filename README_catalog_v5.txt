Web App Library Ver.5.0  /  2026-11-24

【更新方法】
1. ZIPを展開します。
2. GitHubの knishiura777-dotcom/d の main ブランチのルートに、次の4ファイルを上書きアップロードします。
   index.html / students.html / webapps.json / generate_catalog.py
   README_catalog_v5.txt は説明書のためアップロード不要です。
3. GitHub Pagesへの反映後にページを再読み込みします。
   教員制作：https://knishiura777-dotcom.github.io/d/
   学生制作：https://knishiura777-dotcom.github.io/d/students.html

既存ゲーム、教材HTML、psycho-arcade-2026、qrフォルダは削除・移動しないでください。
元のアプリ本体はこのZIPに含まれません。初回は生成スクリプトを実行する必要はありません。
ローカルで index.html または students.html を開けば、カタログデザインを確認できます。
登録済みQRはHTML内に埋め込まれています。新規作品のQRに限り外部QRサービスを使用する場合があります。

【今後の追加】
「GitHub照合」ボタンで公開リポジトリと照合できます。未登録のゲームは原則として学生作品に分類します。
新たな教員制作アプリは webapps.json に collection: general を明記して登録してください。
ローカルの既存アプリフォルダに4ファイルを置き、python generate_catalog.py を実行すると、デザインを維持したまま登録データを再生成します。
旧 generate_catalog.py は新しいデザインを上書きするため、必ず同梱の新版へ交換してください。
更新日はGitHubのファイル別最終コミット日です。「更新日取得」ボタンで取得します。
大文字の Index.html と小文字の index.html はGitHub上では異なるファイルです。大文字の既存ファイルには触れないでください。
