# ワークフローの基礎

```yaml
name: build java # ワークフロー名

on: # トリガー *1
  push:
    branches:
      - main

jobs: # ジョブ定義
  build: # ジョブ名
    runs-on: ubuntu-latest # ジョブを実行するRunner(実行環境)
    steps: # ステップ定義
      - name: checkout source # ステップ名
        uses: actions/checkout@v4 # Actionの利用
      - name: Set up JDK
        uses: actions/setup-java@v4
        with: # Actionに必要な引数の設定
          java-version: 21
          distribution: 'temurin'

      - name: build
        run: mvn compile # スクリプト実行
```
* 1 mainブランチにpushされたタイミングでワークフローが起動する指定
On: コードがプッシュされた場合の処理を指定します。
Jobs:build という 1 つのジョブがあります。
Strategy: Node.js バージョンを指定するために使用されています。
Steps: コードのチェックアウトと dotnet の設定を行っています。
Run: コードを構築しています。
