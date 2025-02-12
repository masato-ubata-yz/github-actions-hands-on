---
title: タイトル（サイドパネルの表示名）
tags: [タグ名, タグ名・・・]
---

# ページタイトル　※ファイル内で1つ

## 見出し1 ※ページ内のメニューになります

### 見出し2 ※ページ内のメニューになります

#### 見出し3

## アラートボックス

:::note
下記の内容で表示されます。
* マーク： :information_source:
* Localeがjaの場合の文言：注記
* 背景色：灰色  
:::

:::danger
下記の内容で表示されます。
* マーク： :fire:
* Localeがjaの場合の文言：危険
* 背景色：赤色
:::

:::tip
下記の内容で表示されます。
* マーク：電球
* Localeがjaの場合の文言：ヒント
* 背景色：緑色
:::

:::info
下記の内容で表示されます。
* マーク： :information_source:
* Localeがjaの場合の文言：備考
* 背景色：水色
:::

:::caution
下記の内容で表示されます。
* マーク： :warning:
* Localeがjaの場合の文言：注意
* 背景色：黄色
:::

## コードブロック

* 行番号表示
```js showLineNumbers
コード
```

* タイトル
```js title="sidebars.js"
const sidebars = {
  tutorialSidebar: [
    {
      type: 'autogenerated',
      dirName: '.'
    }
  ],
};

module.exports = sidebars;
```

* ハイライト
```js
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      // highlight-next-line
      id: 'index',
    },
    {
      type: 'doc',
      id: 'information',
    },
    // highlight-start
    {
      type: 'doc',
      id: 'markdown',
    },
    // highlight-end
  ],
};

module.exports = sidebars;
```

## 表示サイズを制御

概要として表示する範囲の制限。  
ここまでは表示される

<!-- truncate -->

ここは表示されない
