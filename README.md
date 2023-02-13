# Translate Review

這是一個適用於 Chromium 核心瀏覽器的擴充套件，它可以幫助你進行網頁中的字詞翻譯，並將每次翻譯行為紀錄下來，你可以在新分頁中看見自己的翻譯歷史紀錄，你可以試著將最近、最多的翻譯字詞記憶下來，完成你的英文單字學習。

此專案所需相關技術知識如下：

1. Vite
2. Vue 3
3. Chromium Extension

> 此套件採用 Google Basic Translate API 進行翻譯，由於該服務會對大用量進行收費，所以請自行申請 Google Cloud Platform API 金鑰並打包專案並安裝，步驟如下。

1. 申請 Google Cloud Platform API 金鑰 [請參考此](https://cloud.google.com/docs/authentication/api-keys)
2. Download or Clone 此專案
3. 將 API 金鑰輸入至 `src/composable/translate.js` 中的變數 `key` 中
4. 執行 `npm run build` 進行打包
5. 將打包過後的 `dist` 資料夾上傳至瀏覽器

此專案採用 [@samrum/vite-plugin-web-extension](https://github.com/samrum/vite-plugin-web-extension) 作為 Extension 的主要打包工具

歡迎 Fork 開發調整
