## 概要
simplechat
最新50件表示する

## Up
`docker-compose up`してdockerに割り当てられているipの8080ポートでアクセス
例）docker for mac なら `localhost:8080`
`8080`の代わりに`4567`でnginx経由ではなく直接アクセス可

## 構成

* sql/ - mysql設定
* public/ - assetとuploadフォルダ
* views/ - 画面

## DBリセット
`docker-compose down`
念のため`docker rm $(docker ps -aq)`
`docker volume prune`
