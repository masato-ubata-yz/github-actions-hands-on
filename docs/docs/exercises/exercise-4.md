---
title: 演習：イベントを設定してみる#2
authors: [masato-ubata]
tags: [github-actions]
---

# 演習問題

手動実行以外のトリガーを試してみましょう。  

## 問題

計画したスケジュールをトリガーにしたワークフローを定義してください。  
スケジュール設定、ステップの処理内容は自由とします。  

:::note
[イベント](../lesson/events#スケジュール)でも書いた通り、直ぐには反映されないので実行されるまで気長に待ってください。  
n分間隔のような指定にしておくと確認しやすいです。  
（参考：本演習のワークフローの反映まで30分かかりました）
:::

## ゴール

* 設定したトリガーでワークフローが実行された

## 回答例

<details>

```yaml
name: 演習4

on:
  schedule:
    - cron: '*/5 * * * *' # 5分間隔で定期実行

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - run: echo 'exercise-4'

```

</details>