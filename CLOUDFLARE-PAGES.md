# Cloudflare Pages Git連携の推奨設定

このリポジトリは、自主制作・架空のキャリア相談サービス「ミチシル」のUI/UXレビュー用デモです。実際の予約や送信は行いません。

完成済みのHTML/CSS/JavaScript・画像・SVGが `docs/` に格納されています。クラウド上での生成・依存関係のインストールは不要です。

| 設定 | 値 |
| --- | --- |
| Git provider | GitHub |
| Organization | `T-Creative-Logics` |
| Repository | `michishiru-lp` |
| Production branch | `main` |
| Framework preset | `None` |
| Root directory | 未指定（リポジトリルート） |
| Build command | `exit 0` |
| Build output directory | `docs` |
| Environment variables | 不要 |

Root directoryを `docs` に変更する必要はありません。リポジトリルートからの出力先として `docs` を指定してください。リポジトリ全体を配信対象にしないでください。

## 後日接続するとき

Cloudflare PagesでGitリポジトリを選択し、上表の設定を使用します。GitHub連携アプリには、このリポジトリへのアクセスが必要です。

**現在は設定の準備のみです。Cloudflare側でのGit連携設定、プロジェクト作成、Save and Deploy、デプロイ操作は実施していません。** 公開URLはデプロイ後にCloudflareが発行するものを確認してください。

GitHub Pagesは使用しません。公開先変更前に作成されたGitHub Pages設定は解除済みです。

## 配信するファイル

`docs/index.html` と同じディレクトリのCSS/JavaScript、`docs/assets/` の使用素材だけがLP本体です。バックアップ・途中制作物・比較案・スクリーンショットはリポジトリに含めていません。`.nojekyll` は既存の空の互換用ファイルで、GitHub Pagesの公開を有効化するものではありません。

デモフォームは外部送信・メール送信・個人情報の永続保存を行わず、JavaScript無効時・初期化失敗時は操作を無効に保ちます。

## 公式資料

- [Cloudflare Pages: Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Cloudflare Pages: Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
