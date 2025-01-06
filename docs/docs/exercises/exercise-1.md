---
title: 演習：ワークフローを動かす
---

# 演習問題

まずはワークフローを動かしてみましょう。  

## 問題

コンソールに`Hello, GitHub Actions.`と表示してみましょう。

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