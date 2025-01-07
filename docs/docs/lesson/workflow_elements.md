---
title: ワークフロー構文の要素
---

# ワークフロー構文の要素

本ページでは、ワークフロー構文の主要な要素について説明します。  

## 

例をベースに

```yaml showLineNumbers
name: build java # ワークフロー名 *1
on: # イベント定義
  push:
    branches:
      - main
jobs: # ジョブ定義
  build: # ジョブ名 
    runs-on: ubuntu-latest # ランナー指定 *2
    steps: # ステップ定義
      - name: checkout source # ステップ名 *3
        uses: actions/checkout@v4 # uses：アクションや再利用可能ワークフローの利用
      - name: Set up JDK
        uses: actions/setup-java@v4
        with: # with：アクションや再利用可能ワークフローへの引数の設定
          java-version: 21
          distribution: 'temurin'
      - name: build
        run: mvn compile # run：任意のスクリプト実行
  image-build:
    needs: build # 先行ジョブの指定 *4
    runs-on: ubuntu-latest
    steps:
      - run: echo 'sample'
```

* 1：指定するとワークフローの実行結果にこの名称が表示されます。無指定の場合はファイル名が使用されます。
* 2：ジョブごとに指定が必要で、ここで指定したランナー上でワークフローが動作します。
* 3：指定するとワークフローの実行結果にこの名称が表示されます。無指定の場合はすスクリプトやアクションを一部が表示されます。
* 4：先行ジョブを指定することで、ジョブをシリアルに実行できます。先行ジョブは複数指定可能です。
