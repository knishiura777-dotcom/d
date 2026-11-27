Web App Library Ver.6.0 / 2026-11-27

【差し替え】
既存の index.html / students.html / webapps.json / generate_catalog.py を
別のフォルダにバックアップしてから、この4ファイルを既存のd-mainに上書きする。
アプリ本体、既存の学生作品フォルダ、qrフォルダは変更しない。
初回は修正済みカタログなので、Pythonを実行せずにindex.htmlを開いて確認できる。

【再生成】
python generate_catalog.py
事前確認のみ: python generate_catalog.py --dry-run
期待件数: Faculty: 23 Student: 16 Portal: 1
（他のHTMLが増減していない場合）

【新規アプリの分類】
通常のHTML: 教員制作
psycho-arcade-2026/games/ または students/ 内: 学生制作
psycho-arcade-2026/index.html: ポータル
既存の登録情報は維持。その他のサブフォルダの未登録index.htmlは自動登録しない。
登録・分類先・見つからない登録済みファイルを実行時に表示する。

【QR】
既存QRは維持。新規QRを埋め込みたい場合は任意で
python -m pip install "qrcode[pil]"
を実行する。未導入でもブラウザ側のオンラインQR表示機能が利用可能。

【GitHub】
index.html / students.html / webapps.json / generate_catalog.py と、
新規アプリ本体を同じリポジトリの公開対象ブランチへ反映する。
公開後にCtrl+F5でページを再読込する。
公開URLは従来と同じ: https://knishiura777-dotcom.github.io/d/

【注意】
今回は生成元の旧Pythonが提供されていないため、添付の現行HTMLおよびJSONを
テンプレートとして再利用する新しい生成スクリプトを作成した。
