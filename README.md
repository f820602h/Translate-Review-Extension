# Translate Review

> 此專案採用 [@samrum/vite-plugin-web-extension](https://github.com/samrum/vite-plugin-web-extension) 提供的快速模板進行開發。

這是一個適用於 Chromium 核心瀏覽器的擴充套件，它可以幫助你進行網頁中的字詞翻譯，並將每次翻譯行為紀錄下來，你可以在新分頁中看見自己的翻譯歷史紀錄，你可以試著將最近、最多的翻譯字詞記憶下來，完成你的英文單字學習。

#### 此專案相關技術：
1. Vite
2. Vue 3
3. Chromium Extension

#### 安裝及使用：

> 套件採用 Google Basic Translate API 進行翻譯，由於該服務會對大量使用進行收費，所以請自行申請 Google Cloud Platform API 金鑰並打包專案並安裝。

1. 申請 Google Cloud Platform API 金鑰 [請參考此](https://cloud.google.com/docs/authentication/api-keys)
2. Download or Clone 此專案
3. 進入專案目錄並執行 `npm i`
4. 將 API 金鑰輸入至 `src/composable/translate.js` 中的變數 `key` 中
5. 執行 `npm run build` 進行打包
6. 將打包過後的 `dist` 資料夾上傳至瀏覽器的擴充工具中

歡迎 Fork 開發調整
