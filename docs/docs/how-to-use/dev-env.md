---
title: 開発環境
authors: [masato-ubata]
tags: [github-actions]
---

# 開発環境

やり方はさまざまありますが、ここではvscodeを使った環境構築について示します。

## 手順

vscodeがインストールされていることを前提とします。

1. GitHub Actions(Extension)をインストール
3. GitHub Copilot(Extension)　※制限付きですが2024/12/19からフリープランでも使えるようになったので推奨
   1. インストール
   2. GitHub Copilotを有効にする
      1. vscodeからCopilotの利用を求められると思うので、それにしたがって有効化してください。
      2. 何も出てこないようなら、GitHubのプロフィールを開いてYour Copilotから有効化してください。
4. GitHubとvscodeの認証　※求められたら実施を推奨
   1. 認証しておくと、outputs、Secrets、Variablesなどの利用部分の警告表示が解消されます

後は必要なリポジトリをクローンして、ワークフローを開発してください。

## 補足

拡張機能を使うことで得られる効果を簡単に紹介します。

### GitHub Actions

これによりワークフロー作成時にコードアシストされるようになります。
<video width="80%" controls >
  <source src="../../movies/operation-sample_github-actions-extension_vscode.mp4" type="video/mp4" />
  ope-sample
</video>

<!-- [操作サンプル](../../static/movies/operation-sample_github-actions-extension_vscode.mp4) -->

### GitHub Copilot

細かい点に気づけるので、コードレビューはお奨めです。  
コード説明も精度が高いので、コードがよくわからないときは効果的です。  
あくまでも執筆時点ですが、コード修正は微妙なので使用はお奨めしません。
<video width="80%" controls >
  <source src="../../movies/operation-sample_copilot-review_vscode.mp4" type="video/mp4" />
</video>

<!-- [操作サンプル](../../static/movies/operation-sample_copilot-review_vscode.mp4) -->
