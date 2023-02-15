<template>
  <div class="container">
    <h1>Translate Review</h1>

    <h3>近期翻譯</h3>
    <div class="group">
      <template v-if="!words.length">
        <div class="empty">目前沒有任何翻譯紀錄</div>
      </template>
      <template v-else>
        <div v-for="(word, index) in sortByDate" :key="index" class="word">
          <div class="search">
            <div>
              <span>翻譯次數：</span>
              <span>{{ word.times }}</span>
            </div>
            <div>
              <span>上次翻譯：</span>
              <span>{{ durationTimeFormatter(word.date).outputText }}之前</span>
            </div>
          </div>
          <div class="translate">
            <span class="lang">{{ languageName(word.firstLang) }}</span>
            <div class="content">{{ word.first.toLocaleLowerCase() }}</div>
            <span class="lang">{{ languageName(word.foreignLang) }}</span>
            <div class="content">{{ word.foreign.toLocaleLowerCase() }}</div>
          </div>
          <div class="remember">
            <span class="alert">{{ reminder(word) }}</span>
            <button @click="learned(word)">確定記住</button>
          </div>
        </div>
      </template>
    </div>

    <br />

    <h3>翻譯次數排行</h3>
    <div class="group">
      <template v-if="!words.length">
        <div class="empty">目前沒有任何翻譯紀錄</div>
      </template>
      <template v-else>
        <div v-for="(word, index) in sortByTimes" :key="index" class="word">
          <div class="search">
            <div>
              <span>翻譯次數：</span>
              <span>{{ word.times }}</span>
            </div>
            <div>
              <span>上次翻譯：</span>
              <span>{{ durationTimeFormatter(word.date).outputText }}</span>
            </div>
          </div>
          <div class="translate">
            <span class="lang">{{ languageName(word.firstLang) }}</span>
            <div class="content">{{ word.first.toLocaleLowerCase() }}</div>
            <span class="lang">{{ languageName(word.foreignLang) }}</span>
            <div class="content">{{ word.foreign.toLocaleLowerCase() }}</div>
          </div>
          <div class="remember">
            <span class="alert">{{ reminder(word) }}</span>
            <button @click="learned(word)">確定記住</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTranslate } from "@/composable/translate";
import { useRecordStorage } from "@/composable/recordStorage";

const { languages, getSupportedLangs } = useTranslate();
const { read: readRecord, remove: removeRecord } = useRecordStorage();
const words = ref([]);

const sortByDate = computed(() => {
  const copyWords = [...words.value];
  copyWords.sort((a, b) => b.date - a.date);
  return copyWords.filter((word) => word.show).slice(0, 3);
});
const sortByTimes = computed(() => {
  const copyWords = [...words.value];
  copyWords.sort((a, b) => b.times - a.times);
  return copyWords.filter((word) => word.show).slice(0, 3);
});

function durationTimeFormatter(timestamp) {
  const milliseconds = new Date().getTime() - timestamp;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const second = 1000;

  const hours = Math.max(Math.floor(milliseconds / hour), 0);
  const minutes = Math.max(Math.floor((milliseconds % hour) / minute), 0);
  const seconds = Math.max(Math.floor(((milliseconds % hour) % minute) / second), 0);

  const hoursText = hours ? hours + "小時" : "";
  const minutesText = minutes ? minutes + "分鐘" : "";
  const secondsText = hours ? "" : seconds + "秒";
  const outputText = hoursText + minutesText + secondsText;

  return {
    hours,
    minutes,
    seconds,
    outputText,
  };
}

function languageName(wordLang) {
  return languages.value.find((lang) => lang.language === wordLang).name;
}

function reminder(word) {
  if (word.forget) return "你曾經記住過這個單字，請花時間複習，別再忘記了！";
  if (word.times < 3) return "恭喜你接觸到了一個新的單字！";
  if (word.times < 8) return "你已經遇到這個單字不少次，請把它背起來吧！";
  return "你翻譯這個單字太多次了，花點時間記住它吧！";
}

async function learned(word) {
  await removeRecord(word);
  words.value = await readRecord();
}

onMounted(async () => {
  await getSupportedLangs();
  words.value = await readRecord();
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Titillium Web", sans-serif;
  padding: 30px;
  background: #1e1e20;
  color: white;
}

.container {
  width: 600px;
  margin: 0 auto;
}

h1 {
  margin: 0 0 30px 0;
  padding: 0 30px 8px 30px;
  /* border-bottom: 2px solid #646cff; */
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  /* color: #646cff; */
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h3 {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: white;
}

.group {
  width: 100%;
}

.group .empty {
  margin-bottom: 24px;
  padding: 36px;
  border: 1px solid #676e95;
  border-radius: 8px;
  font-size: 28px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  background: #161618;
  color: #bcc0ff;
}

.group .word {
  margin-bottom: 24px;
  padding: 12px 24px;
  border: 1px solid #676e95;
  border-radius: 8px;
  font-size: 28px;
  font-weight: bold;
  line-height: 1.5;
  background: #161618;
  color: #bcc0ff;
}

.group .word .search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #676e95;
  font-size: 18px;
  font-weight: normal;
  color: #bcc0ff;
}

.group .word .translate .content {
  line-height: 1.2;
  margin-bottom: 12px;
  color: #bcc0ff;
}

.group .word .translate .lang {
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background: #676e95;
}

.group .word .remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.group .word .remember .alert {
  font-size: 14px;
  font-weight: normal;
  color: #676e95;
}

.group .word .remember button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  background: #646cff;
  color: white;
  transition: 0.3s;
  cursor: pointer;
}

.group .word .remember button:hover {
  background: #747bff;
}
</style>
