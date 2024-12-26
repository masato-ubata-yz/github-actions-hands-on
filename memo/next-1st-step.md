**Next.js**を使ったサイト作成の基本手順を以下にまとめます。  

---

## **1. プロジェクトのセットアップ**

### **1.1 Node.js のインストール確認**  
Next.js は Node.js 環境が必要です。以下のコマンドでバージョンを確認します。  
```bash
node -v
npm -v
```

**推奨バージョン:**
- Node.js: **18.17.0**以上  
- npm: **9.0.0**以上  

### **1.2 新規プロジェクト作成**  
以下のコマンドでプロジェクトをセットアップします。  
```bash
npx create-next-app@latest my-next-app
```

**オプション選択例:**
- **TypeScript:** Yes（TypeScript対応を推奨）  
- **ESLint:** Yes（コードチェック対応）  
- **Tailwind CSS:** No or Yes（デザインの自由度に応じて選択）  
- **src/ディレクトリ構成:** Yes（管理しやすくなる）  
- **App Router:** Yes（新しい機能を活用）  
- **Turbopack:** Yes
- customize the import alias: Yes
- import alias: @/

完了後、ディレクトリに移動します。  
```bash
cd my-next-app
```

---

## **2. 開発サーバーの起動**

### **2.1 サーバーを起動する**  
```bash
npm run dev
```
ブラウザで以下のURLを開きます。  
[http://localhost:3000](http://localhost:3000)  

---

## **3. ページとルーティングの追加**

### **3.1 ページの追加**
Next.jsでは**ファイルベースのルーティング**を採用しており、`pages` または `app` ディレクトリにファイルを追加するだけでルートが作成されます。  

例: `src/app/about/page.tsx` に以下を追加します。  
```tsx
export default function About() {
  return <h1>About Page</h1>;
}
```

### **3.2 動的ルーティング**
URLごとに動的にページを生成する場合は以下のようにします。

例: `src/app/blog/[id]/page.tsx`
```tsx
export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>Blog Post ID: {params.id}</h1>;
}
```
URL: `http://localhost:3000/blog/123`

---

## **4. APIルートの作成**

Next.js では、サーバーレス関数を簡単に作成できます。  

例: `src/app/api/hello/route.ts`
```typescript
export async function GET() {
  return Response.json({ message: 'Hello World!' });
}
```

エンドポイント:  
`http://localhost:3000/api/hello`

---

## **5. スタイル設定**

### **5.1 CSS モジュール**
デフォルトでCSSモジュールがサポートされています。  

例: `src/app/globals.css`
```css
body {
  font-family: Arial, sans-serif;
}
```

### **5.2 Tailwind CSS の導入**（オプション）
以下のコマンドで導入できます。
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

設定ファイル: `tailwind.config.js`
```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## **6. ビルドとデプロイ**

### **6.1 ビルド**
```bash
npm run build
```
成果物は `out` ディレクトリに出力されます。

### **6.2 デプロイ**
**Vercel**を使用すると簡単にデプロイできます。  
1. [Vercel](https://vercel.com/) にログイン。  
2. GitHubリポジトリを連携。  
3. 「Import」からプロジェクトを追加してデプロイ。  

---

## **7. CI/CD対応（オプション）**

### **GitHub Actions例:**
`.github/workflows/deploy.yml` を作成:
```yaml
name: Deploy Next.js App

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## **8. まとめ**

### **手順の流れ:**
1. **プロジェクト作成:** `npx create-next-app`  
2. **開発サーバー起動:** `npm run dev`  
3. **ページやAPIの追加:** ファイルベースルーティングを活用。  
4. **スタイル設定:** CSSモジュールやTailwind CSSでカスタマイズ。  
5. **ビルドとデプロイ:** `npm run build` とVercelで簡単デプロイ。  

これでNext.jsによるサイト構築が完了します！  
さらに詳細やカスタマイズが必要であれば、いつでも質問してください！