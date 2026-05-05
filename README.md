# Todo Board App

## アプリケーション概要

Todo Board App は、タスクをボード形式で管理できる Web アプリケーションです。  
タスクの作成・一覧表示・詳細確認・編集・削除といった基本的な CRUD 操作に加え、検索、ソート、ドラッグ＆ドロップによるステータス変更に対応しています。

タスクは `TODO`、`DOING`、`DONE` の 3 カラムで管理され、進捗を視覚的に把握しやすい構成にしています。  
また、一覧画面だけでなく、新規作成ページ、詳細ページ、編集ページを分けることで、操作しやすさと見やすさの両立を意識して実装しました。

---

## 主な機能

- タスクの新規作成 (Create)
- タスク一覧表示 (Read)
- タスク詳細表示 (Read)
- タスク編集 (Update)
- タスク削除 (Delete)
- タスクの検索
- タスクのソート
- ドラッグ＆ドロップによるステータス変更
- `TODO` / `DOING` / `DONE` の 3 カラム管理

---

## 使用技術

### フロントエンド

- React
- TypeScript
- Vite
- React Router
- Apollo Client
- CSS
- `@dnd-kit/core`
- `@dnd-kit/utilities`
- `lucide-react`

### バックエンド

- NestJS
- GraphQL
- Prisma

### データベース

- PostgreSQL

---

## リポジトリ

[GitHub リポジトリ](https://github.com/AKARI-intern/intern-hw-saas-sw-dib-fujiyoshi-kensuke)

---

## 起動方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/AKARI-intern/intern-hw-saas-sw-dib-fujiyoshi-kensuke.git
cd intern-hw-saas-sw-dib-fujiyoshi-kensuke
```

### 2. 依存関係をインストール

```bash
npm install
```

必要に応じて、`frontend` と `backend` でも依存関係を確認してください。

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

### 3. データベースを準備

PostgreSQL を起動し、環境変数 `DATABASE_URL` を設定してください。  
その後、`backend` ディレクトリでマイグレーションを適用します。

```bash
cd backend
npx prisma migrate dev
```

### 4. バックエンドを起動

```bash
cd backend
npm run start:dev
```

### 5. フロントエンドを起動

別ターミナルで以下を実行します。

```bash
cd frontend
npm run dev
```

---

## 動作確認動画

CRUD 操作が分かる動作確認動画は以下です。 

<video width="900" controls src="https://github.com/user-attachments/assets/d7a0ef4e-fcfe-4e54-81ed-6ba4e6316e0e"></video>

GitHub 上でプレビューできない場合は、軽量版またはリンク先で `View raw` を押してご確認ください。

- [動作確認動画（通常版）](./task_board_app_demo.mp4)
- [動作確認動画（軽量版）](./task_board_app_demo_small.mp4)

---

## 動作確認で確認できる内容

- タスクの新規作成
- 一覧画面での確認
- 詳細画面の表示
- タスク内容の編集
- タスク削除
- 検索
- ソート
- ドラッグ＆ドロップによるステータス変更

## 工夫した点

- `TODO`、`DOING`、`DONE` の 3 カラム構成にし、進捗を直感的に把握しやすくしました。
- タスクカードが一覧画面で面積を取りすぎないように調整し、複数タスクを見渡しやすくしました。
- 新規作成、詳細、編集ページの上部デザインをそろえ、画面遷移後も統一感のある UI になるようにしました。
- ドラッグ＆ドロップ時には、ボタン操作と競合しにくいように調整しました。
- タイトルだけでなく説明文も検索対象に含め、実用性を高めました。
- タスクに集中できるように、白を基調とし、カラフルなデザインは避けました。

---

## 補足

本アプリは、タスク管理の基本操作に加え、見た目の分かりやすさと操作性を意識して実装しました。  
特に、一覧画面での視認性、ページ間のデザイン統一、ドラッグ＆ドロップによる直感的な操作を重視しています。
