---
title: ワークフロー構文の要素
---

# ワークフロー構文の要素

```yaml showLineNumbers
name: build java # ワークフロー名
on: # イベント定義
  push:
    branches:
      - main
jobs: # ジョブ定義
  build: # ジョブ名 
    runs-on: ubuntu-latest # ランナー指定
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
  image-build:
    needs: build # 先行ジョブの指定
    runs-on: ubuntu-latest
    steps:
      - run: echo 'sample'
```

|行番号|必須？|備考|
|---|---|---|
|1|N|指定するとワークフローの実行結果にこの名称が表示されます。無指定の場合はファイル名が使用されます。|
|2|Y|ここで指定されたトリガーに応じてワークフローが実行されます|
|3|Y||
|8|Y|ジョブを実行するランナーの指定。ジョブごとに指定が必要で、ここで指定したランナー上でワークフローが動作します。|
|9|Y||
|10|N|指定するとワークフローの実行結果にこの名称が表示されます。無指定の場合はすスクリプトやアクションを一部が表示されます|
|11|-|アクションを実行する場合、使用します|
|14|-|アクションや再利用可能ワークフローへの引数の指定|
|18|-|任意のスクリプトを実行する場合、使用します|
|20|N|ジョブの終了を待たせたい場合、指定します|
