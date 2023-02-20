# Translate Review

這是一個適用於 Chromium 核心瀏覽器的擴充套件，它可以幫助你進行網頁中的字詞翻譯，並將每次翻譯行為紀錄下來，你可以在新分頁中看見自己的翻譯歷史紀錄，你可以試著將最近、最多的翻譯字詞記憶下來，完成你的英文單字學習。

> 此專案採用 [@samrum/vite-plugin-web-extension](https://github.com/samrum/vite-plugin-web-extension) 提供的快速模板進行開發。

> 套件採用 Google Basic Translate API 進行翻譯，以及 Google Cloud Firestore API 進行資料儲存，由於兩項服務超過一定使用量後，均會開始進行收費，因此需要自行申請 Google Cloud Platform API 金鑰、啟用 firebase 服務並打包專案及安裝。

<br />

## 安裝及使用：

### 1. Google Cloud Platform 準備：

1. 使用 Google 帳號啟用 [Google Cloud Platform](https://cloud.google.com/)。

2. 進入 Google Cloud Platform 控制台並新建專案，專案名稱可自訂。

3. 前往專案的 [「API 和服務」](https://console.cloud.google.com/apis/dashboard)。

4. 進入「API 和服務」中的[「程式庫」](https://console.cloud.google.com/apis/library)，搜尋 Google Translate API 以及 Google Cloud Firestore API 並點擊啟用。

5. 進入「API 和服務」中的[「憑證」](https://console.cloud.google.com/apis/credentials)，點擊建立憑證，選擇 API 金鑰。

6. 選擇金鑰並進行編輯，金鑰名稱可自訂，將金鑰進行 API 限制，選擇 Google Translate API 以及 Google Cloud Firestore API 兩項並儲存。

7. 請將金鑰暫時記下來。

<br />

### 2. Google Firebase 準備：

1. 使用 Google 帳號啟用 [Firebase](https://firebase.google.com/)。

2. 進入 Firebase 控制台並新建專案，選擇將 Firebase 加入你的 Google Cloud 專案。

3. 進入專案，並從側邊欄進入 Firestore，點擊「創建資料庫」。

4. 進入「規則」頁簽，將規則該為以下邏輯並發布。

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

5. 進入 Firebase 專案的「專案設定／一般設定」，並移至「您的應用程式」區塊，選擇使用 web 平台新增應用程式（</>圖樣按鈕）。

6. 輸入應用程式名稱，名稱可自訂，將 `firebaseConfig` 區塊暫時記下來
   ```
   const firebaseConfig = {
      apiKey: "XXXXXXXXXXXXXXXXX",
      authDomain: "XXXXXXXXX.firebaseapp.com",
      projectId: "XXXXXXXXX",
      storageBucket: "XXXXXXXXX.appspot.com",
      messagingSenderId: "XXXXXXXXX",
      appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   };
   ```

<br />

### 3. Github 專案準備：

1.  Download or Clone 此專案。

2.  進入專案目錄並執行 `npm i`。

3.  將步驟 1-7 的 API 金鑰輸入至 `src/composable/translate.js` 中的變數 `key` 中。

4.  將步驟 2-6 的 `firebaseConfig` 替換掉 `src/composable/recordStorage.js` 中的 `firebaseConfig`，並將 `apiKey` 改為步驟 1-7 的 API 金鑰。

5.  執行 `npm run build` 進行打包。

6.  將打包過後的 `dist` 資料夾上傳至瀏覽器的擴充工具中。

<br />

歡迎 Fork 開發調整或發 Issue 提問。
