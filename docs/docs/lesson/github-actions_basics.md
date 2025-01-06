---
title: GitHub Actionsの基礎
---

# GitHub Actionsの基礎

2019年11月に正式リリースされたGitHubのCI/CDプラットフォームです。   
主にCI/CDやGitHubの運用プロセス自動化などに使用します。  
使用可能な機能は、リポジトリのスコープ（Public/Private）やライセンス形態によって異なります。

## 学習の目的

本ページでは、GitHub Actionsのコンポーネント構成とそれぞれの概要を理解することを目的とします。

## コンポーネント

GitHub Actionsは以下のようなコンポーネントで構成されています。  

![コンポーネント](@site/static/img/github-actions_components.drawio.png)

### ワークフロー(workflow)

GitHub Actionsによるる自動化プロセスのことです。  
1つ以上のジョブで構成されます。  
ワークフローは「`.github/workflows`」ディレクトリ内にYAMLファイルで定義します。  

:::info
`.github/workflows`以外に配置するとワークフローとして認識されません。  
数が多くなってくると`.github/workflows/customer`のようにサブディレクトリを設けてカテゴライズしたくなりますが、これをするとワークフローが呼び出せなくなるので注意が必要です。  
:::

### イベント

ワークフロー実行をトリガーのことです。  
PRが作成されたとか、特定のブランチにプッシュされたなどをトリガーとし、ワークフローを実行できます。  
イベントの一覧は、「[ワークフローをトリガーするイベント](https://docs.github.com/ja/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows)」を参照してください。  
利用頻度の高めのイベントをピックアップして指定例を例示します。

#### 手動実行、プルリクエスト、プッシュ

```yaml
on:
  # 手動実行
  workflow_dispatch:
  # プルリクエストを対象としたトリガー
  # * 対象ブランチ：`develop/`で始まるブランチ
  # * 対象パス：`order`配下のリソース
  # * アクティビティ：プルリクエストの作成、変更同期、リオープン
  pull_request:
    branches: 
      - 'develop/**'
    paths: 
      - 'order/**'
    types:
      - opened
      - synchronize
      - reopened
  # ブランチへのプッシュを対象としたトリガー
  # * 対象ブランチ：`develop/`で始まるブランチ
  # * 対象パス：`order`配下のリソース
  push:
    branches: 
      - 'develop/**'
    paths: 
      - 'order/**'
```    
:::tip
プルリクエストを対象としブランチを指定する場合、マージ先のブランチが対象になります。  
たとえばfeatureからdevelopへのPRを対象にしたい場合は、branchesに指定するのはdevelopになります。  
間違えやすいので注意が必要です。
:::

#### スケジュール

定期的に実行したいワークフローに対してスケジュール指定できます。  
スケジュールは[POSIX cron 構文](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)で指定します。

```yaml
on:
  schedule:
    - cron: "15 4,5 * * *"
```
:::info
```txt
* * * * *  
^ ^ ^ ^ ^  
| | | | L day of the week(0-6 or SUN-SAT)
| | | L month(1-12 or JAN-DEC)
| | L day of month(1-31)
| L hour(0-23)
L minute(0-59)
```
:::

#### ワークフローからの呼び出し

再利用可能ワークフロー(Reusable workflow)は、ワークフローから呼び出されることを前提とします。  
再利用可能ワークフローのイベントは下記のように定義します。

```yaml
on: workflow_call
```

### ジョブ(Job)

同一のランナー上で実行されるステップ群のことです。  
1つ以上のステップで構成されるます。

### ステップ(Step)

アクションやスクリプトなど、実際に実行する処理のことです。  
ステップは定義されている順に実行されます。  
同一ジョブ内のステップは、同じランナーで実行されるため、ステップ間のデータを共有できます。  

```yaml
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

### アクション(Action)

アクションは再利用可能なスクリプトで[アクションマーケットプレイス](https://github.com/marketplace)から取得できます。

### ランナー(Runner)

ジョブを実行するサーバーのことです。  
GitHubでは、Ubuntu Linux、Microsoft Windows、macOSをランナーとして提供しています。  
ジョブごとにプロビジョニングされた環境上で処理が実行されます。  
  
GitHub[より大きな構成で使うことができるランナー](https://docs.github.com/ja/actions/using-github-hosted-runners/using-larger-runners)も用意されています。  
他のOSやハードウェアが必要な場合に備えて、[自己ホストランナー](https://docs.github.com/ja/actions/hosting-your-own-runners)を定義することも可能です。  
