**Docusaurus**で静的サイトを作る手順を以下にまとめます。  

---

## **1. プロジェクトのセットアップ**

### **1.1 Node.jsのインストール確認**  
DocusaurusはNode.jsが必要です。以下のコマンドでバージョンを確認します。  
```bash
node -v
npm -v
```

**推奨バージョン:**
- Node.js: **16.14.0**以上  
- npm: **7.0.0**以上  

---

### **1.2 プロジェクトの作成**  
以下のコマンドでプロジェクトを作成します。  
```bash
npx create-docusaurus@latest my-docusaurus-site classic
```

- **`my-docusaurus-site`**: プロジェクト名（任意の名前に変更可）  
- **`classic`**: テンプレートの選択。一般的な構成でMarkdown対応済み。  
  - 他の選択肢として`facebook`があるらしい
  - その他は開発中らしい。

**処理内容:**
- 必要な依存パッケージをインストール。  
- サンプルページが自動生成されます。  

---

### **1.3 開発サーバーの起動**  
以下のコマンドで開発サーバーを起動します。  
```bash
cd my-docusaurus-site
npm start
```

ブラウザで以下のURLを開きます。  
[http://localhost:3000](http://localhost:3000)  

---

## **2. Markdownファイルを使ったページ作成**

### **2.1 ドキュメント用ディレクトリの作成**  
以下のディレクトリが標準で作成されています。  
```plaintext
docs/
```

### **2.2 Markdownファイルの追加**  
例: `docs/problem1.md` を作成。  
```markdown
# 演習問題1

この問題では以下を学びます。

- 条件1
- 条件2

## 手順

1. 確認する。
2. 実装する。
```

---

### **2.3 サイドバーに追加**  
サイドバー設定ファイルは `sidebars.js` にあります。  
```javascript
module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '演習問題',
      items: ['problem1'], // 作成したMarkdownファイル名
    },
  ],
};
```

**再起動不要**で反映されます。ブラウザで確認しましょう。  
URL例: [http://localhost:3000/docs/problem1](http://localhost:3000/docs/problem1)

---

## **3. カスタムページの追加**

### **3.1 `src/pages` にファイルを追加**  
例: `src/pages/example.tsx`  
```typescript
import React from 'react';

export default function Example() {
  return (
    <div>
      <h1>カスタムページ</h1>
      <p>これはカスタムページです。</p>
    </div>
  );
}
```

URL例: [http://localhost:3000/example](http://localhost:3000/example)

---

## **4. カスタム設定（オプション）**

### **4.1 テーマの変更**  
デフォルトテーマのカスタマイズは `src/css/custom.css` で可能。  

例: 見出しの色を変更。  
```css
h1 {
  color: #007bff;
}
```

### **4.2 メタデータ設定**  
サイトのメタデータは `docusaurus.config.js` で設定。  

例:
```javascript
module.exports = {
  title: '演習問題サイト',
  tagline: 'Markdownで簡単作成',
  url: 'https://example.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
};
```

---

## **5. ビルドとデプロイ**

### **5.1 ビルド**
```bash
npm run build
```
静的サイトは `build/` フォルダに生成されます。

### **5.2 デプロイ**
**GitHub Pages**を使う場合:
```bash
GIT_USER=<GitHubユーザー名> npm run deploy
```

---

## **6. 演習用の実装例**

### **Markdownによる演習問題**
例: `docs/example.md`
```markdown
---
id: example
title: 演習問題サンプル
---

# 演習問題

1. この問題では基本的な動作を確認します。
2. 解答結果を提出してください。
```

### **プレビュー確認**  
URL: [http://localhost:3000/docs/example](http://localhost:3000/docs/example)

---

## **7. まとめ**

### **基本手順:**
1. プロジェクト作成:  
   ```bash
   npx create-docusaurus@latest my-docusaurus-site classic
   ```
2. 開発サーバー起動:  
   ```bash
   npm start
   ```
3. Markdown追加:  
   `docs/` にMarkdownファイルを追加し、サイドバーに登録。  
4. ビルドとデプロイ:  
   ```bash
   npm run build
   npm run deploy
   ```

**Docusaurus** はMarkdownを基本とした簡単な運用を可能にします。  
何か追加のカスタマイズや質問があれば遠慮なく聞いてください！

---
## トラブルシューティング

```
リンク切れ

[ERROR] Error: Unable to build website for locale ja.
  [cause]: Error: Docusaurus found broken links!

  Please check the pages of your site in the list below, and make sure you don't reference any path that does not exist.
  Note: it's possible to ignore broken links with the 'onBrokenLinks' Docusaurus configuration, and let the build pass.
```
