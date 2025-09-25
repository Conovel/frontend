# frontend

## dockerで起動する場合

[environment](https://github.com/Conovel/environment)リポジトリのサブモジュールになっているのでenvironmentでDcokerを起動するとfrontendも一緒に起動します

## 単独で使う場合

### リモートからリポジトリをクローン

```sh
$ git clone https://github.com/Conovel/frontend.git
```

※Windows環境だと改行コードが変換されてしまう可能性があります。その場合は`git clone`を実行する前に下記のコマンドを実行してください。

```sh
$ git config --global core.autocrlf input
```

### nodeとnpmのバージョン確認

```sh
$ node -v
$ npm -v
```

- ない場合はnodeのインストールが必要
- nodeのバージョンは20.16.0想定（ない場合はnvmでインストールと切り替えが必要）

### パッケージのインストール

```sh
$ npm install
```

- packege-lock.jsonと/node_modulesが生成される

### 環境変数の設定

アカウント設定機能を使用する場合は、以下の環境変数を設定してください：

```sh
# .envファイルを作成
$ echo "REACT_APP_API_BASE_URL=http://localhost:8080" > .env
```

- `REACT_APP_API_BASE_URL`: APIサーバーのベースURL（デフォルト: http://localhost:8080）

### ローカルサーバー起動

```sh
$ npm run dev
```

### フォーマット

prettierによるフォーマット

```sh
$ npm run format
```

- コミットプッシュ時にも実行されます（husky）

### テスト

jestによるテスト実行

```sh
$ npm test
```

- コミットプッシュ時には実行されないため、手動で実行してください
