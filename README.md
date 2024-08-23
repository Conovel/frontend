# frontend

## dockerで起動する場合

[environment](https://github.com/Conovel/environment)リポジトリのサブモジュールになっているのでenvironmentでDcokerを起動するとfrontendも一緒に起動します

## 単独で使う場合

### リモートからリポジトリをクローン
```
$ git clone https://github.com/Conovel/frontend.git
```

### nodeとnpmのバージョン確認
```
node -v
npm -v
```
ない場合はnodeのインストールが必要
nodeのバージョンは20.16.0想定
（ない場合はnvmでインストールと切り替えが必要）

### パッケージのインストール
```
$ npm install
```
packege-lock.jsonと/node_modulesが生成される

### ローカルサーバー起動
```
$ npm run dev
```