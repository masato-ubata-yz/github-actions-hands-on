---
title: 演習：ワークフローを動かす
---

# 演習問題

まずはワークフローを動かしてみましょう。  

## 問題

コンソールに`Hello, GitHub Actions.`と表示してみましょう。  
イベントは手動実行にしてください。  
ワークフローの手動実行の仕方は[こちら](../how-to-use/manually-run-the-workflow.md)を参照
```yaml
# イベントの手動実行
on:
  workflow_dispatch:
```

## ゴール

* ワークフローに定義した処理が実行された

## 回答例

<details>

```yaml
name: 演習1

on:
  workflow_dispatch:

jobs:
  exercise-1:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Hello, GitHub Actions."

```

</details>