---
title: 演習：ジョブの依存関係を定義する
---

# 演習問題

ジョブを複数定義して、ジョブ間の依存関係を定義してみましょう。

## 問題

下記の実行結果になるようにジョブを関連付けてください。  
ステップの処理内容は自由、イベントは手動実行とします。  

```mermaid
flowchart LR
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

## ゴール

* 意図した通りにジョブの依存関係を組めた

## 回答例

<details>

```yaml
name: 演習2

on:
  workflow_dispatch:

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: step1
        run: echo 'step1'
  job2:
    needs: job1
    runs-on: ubuntu-latest
    steps:
      - name: step2
        run: echo 'step2'
  job3:
    runs-on: ubuntu-latest
    steps:
      - name: step3
        run: echo 'step3'
```

</details>