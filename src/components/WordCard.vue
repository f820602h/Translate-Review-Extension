<template>
  <div class="word">
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
      <div class="lang">{{ languageName(word.firstLang) }}</div>
      <div class="content">{{ word.first.toLocaleLowerCase() }}</div>
      <div class="space"></div>
      <div class="lang">{{ languageName(word.foreignLang) }}</div>
      <div class="content">{{ word.foreign.toLocaleLowerCase() }}</div>
    </div>
    <div class="remember">
      <span class="alert">{{ reminder(word) }}</span>
      <button @click="$emit('remember', word)">確定記住</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  languages: {
    type: Array,
    required: true,
  },
  word: {
    type: Object,
    required: true,
  },
});

defineEmits(["remember"]);

function languageName(wordLang) {
  return props.languages.find((lang) => lang.language === wordLang).name;
}

function reminder(word) {
  if (word.forget) return "你曾經記住過這個單字，請花時間複習，別再忘記了！";
  if (word.times < 3) return "恭喜你接觸到了一個新的單字！";
  if (word.times < 8) return "你已經遇到這個單字不少次，請把它背起來吧！";
  return "你翻譯這個單字太多次了，花點時間記住它吧！";
}

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
</script>

<style lang="scss" scoped>
.word {
  padding: 12px 24px;
  border: 1px solid #676e95;
  border-radius: 8px;
  font-size: 28px;
  font-weight: bold;
  line-height: 1.5;
  color: #bcc0ff;
  background: #161618;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #676e95;
    font-size: 14px;
    font-weight: normal;
    color: #676e95;
  }

  .translate {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .lang {
      display: inline-block;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      color: white;
      background: #676e95;
    }

    .content {
      line-height: 1;
      margin-top: 6px;
      color: #bcc0ff;
    }

    .space {
      height: 20px;
    }
  }

  .remember {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #676e95;
    .alert {
      font-size: 14px;
      font-weight: normal;
      color: #676e95;
    }
    button {
      padding: 4px 8px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      background: #646cff;
      color: white;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        background: #747bff;
      }
    }
  }
}
</style>
