---
title: イベント
authors: [masato-ubata]
tags: [github-actions]
---

# イベント

多くのイベントが提供されているので、概要と利用頻度の高いものをピックアップして説明します。  

## イベント一覧

|名称|イベントの発生条件|
|---|---|
|branch_protection_rule|リポジトリ内のブランチ保護ルールが変更された|
|check_run|チェック実行に関連するアクティビティが発生（リクエスト、完了など）|
|check_suite|チェックスイートが完了した|
|create|リポジトリにブランチまたはタグを作成した|
|delete|リポジトリのブランチまたはタグを削除した|
|deployment|リポジトリにデプロイを作成した|
|deployment_status|サード パーティによってデプロイの状態が提供された|
|discussion|リポジトリ内のディスカッションが作成または変更された|
|discussion_comment|リポジトリ内のディスカッションのコメントが作成または変更された|
|fork|リポジトリをフォークした|
|gollum|Wikiを作成または更新した|
|issue_comment|issueまたはプルリクエストのコメントが作成、編集または削除された|
|issues|リポジトリ内のissueが作成または変更された|
|label|リポジトリ内のラベルが作成または変更された|
|merge_group|マージキューにプルリクエストが追加された|
|milestone|リポジトリ内のマイルストーンが作成または変更された|
|page_build|GitHub Pages の公開元であるブランチに誰かがプッシュした|
|public|リポジトリがプライベートからパブリックに変更された|
|pull_request|リポジトリ内のプルリクエストのアクティビティが発生した（ステータス変更や内容の変更など）|
|pull_request_review|プルリクエストのレビューが送信、編集、または無視された|
|pull_request_review_comment|プルリクエストのレビュー コメントが変更された|
|pull_request_target|リポジトリ内のプルリクエストのアクティビティが発生した。<br/>pull_requestと似ていますが、Secretsの利用可否、外部プルリクエストの可否などが異なります。|
|push|プッシュ|
|registry_package|GitHub Packagesに関連するアクティビティがリポジトリで発生（アーティファクトのプッシュ、更新）|
|release|リポジトリのリリースアクティビティが発生（プッシュ/アンプッシュ、CRUDなど）|
|repository_dispatch|GitHub API を使った|
|schedule|スケジュールした時刻の到来|
|status|Gitコミットの状態が変更された|
|watch|リポジトリが Star 付きになった|
|workflow_call|他ワークフローから呼び出された|
|workflow_dispatch|手動実行|
|workflow_run|ワークフローの実行が要求されたか完了した|

イベントの一覧は、「[ワークフローをトリガーするイベント](https://docs.github.com/ja/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows)」を参照してください。  

## 指定例

利用頻度の高めのイベントをピックアップして指定方法を例示します。

### 手動実行、プルリクエスト、プッシュ

```yaml showLineNumbers
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

### スケジュール

定期的に実行したいワークフローに対してスケジュール指定できます。  

```yaml showLineNumbers
on:
  schedule:
    - cron: "15 4,5 * * *"
```
:::tip
* スケジュール実行はおおよそその時間に動作すれば良いというような設定にするのが肝要です。
  * スケジュールの遅延: 指定された時間が到来しても実行されず、数分の遅延が発生する可能性があります。
  * リソースの制約: 無料プランや制限付きプランの場合、リソース制約によりスケジュールされたワークフローが遅延する可能性があります。
  * 同時実行の制限: 同時に実行できるワークフローの数に制限があるため、他のワークフローが実行中の場合、スケジュールされたワークフローが待機状態になることがあります。
  * cronの反映: cronの反映には時間を要します。高負荷がかかっているとキューからジョブが削除される可能性もあります。
* 時刻を設定する場合、タイムゾーン（UTC）に注意が必要です。たとえばJSTであれば、UTCとの差が9時間あるのでそれを考慮してください。
* cron構文
  ```txt
  * * * * *  
  ^ ^ ^ ^ ^  
  | | | | L day of the week(0-6 or SUN-SAT)
  | | | L month(1-12 or JAN-DEC)
  | | L day of month(1-31)
  | L hour(0-23)
  L minute(0-59)
  ```
  詳細は[POSIX cron 構文](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)を参照。
:::

### ワークフローからの呼び出し

再利用可能ワークフロー(Reusable workflow)は、ワークフローから呼び出されることを前提とします。  
再利用可能ワークフローのイベントは下記のように定義します。

```yaml showLineNumbers
on: workflow_call
```
