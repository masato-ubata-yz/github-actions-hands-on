---
title: 演習：複数ジョブを定義して、ジョブの依存関係を定義する
---

# 演習問題

ジョブを複数定義して、ジョブ間の依存関係を定義してみましょう。

## 問題

```mermaid
flowchart
  start(( ))
  step1(step1)
  step2(step2)
  step3(step3)
  fin((( )))

  subgraph job1
    step1
  end

  subgraph job2
    step2
  end

  subgraph job3
    step3
  end

  start --> step1
  step1 --> step2
  step2 --> fin

  start --> step3
  step3 --> fin
```
|name|spec|
|---|---|
|step1|コンソールに`step1`と表示する|
|step2|コンソールに`step2`と表示する|
|step3|コンソールに`step1`と表示する|

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