---
title: GitHub Actionsのコンポーネント
authors: [masato-ubata]
tags: [github-actions]
---

# GitHub Actionsのコンポーネント

本ページでは、GitHub Actionsのコンポーネントについて説明します。  

## コンポーネント構成

GitHub Actionsは以下のようなコンポーネントで構成されています。  

![コンポーネント構成](@site/static/img/github-actions_components.drawio.png)

## ワークフロー(workflow)

GitHub Actionsによるる自動化プロセスのことです。  
1つ以上のジョブで構成されます。  
ワークフローは「`.github/workflows`」ディレクトリ内にYAMLファイルで定義します。  

:::info
`.github/workflows`以外に配置するとワークフローとして認識されません。  
数が多くなってくると`.github/workflows/customer`のようにサブディレクトリを設けてカテゴライズしたくなりますが、これをするとワークフローが呼び出せなくなるので注意が必要です。  
:::

## イベント(Event)

ワークフロー実行のトリガーです。  
プルリクエストが作成されたとか、特定のブランチにプッシュされたなどをトリガーとし、ワークフローを実行できます。  

## ジョブ(Job)

同一のランナー上で実行されるステップ群のことです。  
1つ以上のステップで構成されるます。

## ステップ(Step)

アクションやスクリプトなど、実際に実行する処理のことです。  
ステップは定義されている順に実行されます。  
同一ジョブ内のステップは、同じランナーで実行されるため、ステップ間のデータを共有できます。  

```yaml showLineNumbers
jobs:
  build:
    runs-on: ubuntu-latest
    steps: # 定義されている順に実行
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: ${{ inputs.java-version }}
          distribution: 'temurin'
      - run: mvn build
      - run: tree target # ex. target/sample.jar
  next-step: # needsでbuildを指定しているため、buildジョブの終了を待ってから実行されます
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: tree target # ジョブが分かれるとランナーが異なるため、どこかにストアしない限りbuildジョブのデータは共有できません
  individual-step: # needsの指定がないため、build,next-stepとは並列に動作します
    runs-on: ubuntu-latest
    steps:
      - run: tree # ジョブが分かれるとランナーが異なるため、どこかにストアしない限りbuildジョブのデータは共有できません
```

---
## アクション(Action)

アクションは再利用可能なスクリプトで[アクションマーケットプレイス](https://github.com/marketplace)から取得できます。

## ランナー(Runner)

ジョブを実行するサーバーのことです。  
GitHubでは、Ubuntu Linux、Microsoft Windows、macOSをランナーとして提供しています。  
ジョブごとにプロビジョニングされた環境上で処理が実行されます。  
  
GitHub[より大きな構成で使うことができるランナー](https://docs.github.com/ja/actions/using-github-hosted-runners/using-larger-runners)も用意されています。  
他のOSやハードウェアが必要な場合に備えて、[自己ホストランナー](https://docs.github.com/ja/actions/hosting-your-own-runners)を定義することも可能です。  

## 再利用可能ワークフロー(Reusable workflow)

他ワークフローから呼び出し可能なワークフローのことです。  
部品化されたワークフローと捉えてください。
