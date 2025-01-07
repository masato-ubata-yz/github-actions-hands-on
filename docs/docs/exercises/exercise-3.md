---
title: 演習：イベントを設定してみる
---

# 演習問題

手動実行以外のトリガーを試してみましょう。  

## 問題

プッシュをトリガーにしたワークフローを定義してください。  
ステップの処理内容は自由とします。  

## ゴール

* 設定したトリガーでワークフローが実行された

## 回答例

<details>

```yaml
name: 演習3

on:
  push:
    branches: main
  
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - run: echo 'exercise-3'

```

</details>