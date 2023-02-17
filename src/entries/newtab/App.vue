<template>
  <div class="container">
    <h1>Translate Review</h1>

    <div class="tab-nav">
      <div class="tab-group">
        <div class="tab" :class="{ active: currentTab === 'recent' }" @click="currentTab = 'recent'">近期翻譯</div>
        <div class="tab" :class="{ active: currentTab === 'times' }" @click="currentTab = 'times'">次數排行</div>
      </div>

      <div v-if="words.length" style="text-align: right">
        <span>共有 {{ words.length }} 筆</span>
        <span>／</span>
        <span class="display" @click="showAll = !showAll">{{ showAll ? "僅顯示前三筆" : "顯示全部" }}</span>
      </div>
    </div>

    <div class="group">
      <template v-if="!words.length">
        <div class="empty">目前沒有任何翻譯紀錄</div>
      </template>

      <template v-else-if="currentTab === 'recent'">
        <WordCard
          v-for="(word, index) in sortByDate"
          :key="index"
          :languages="languages"
          :word="word"
          @remember="onRemember"
        />
      </template>

      <template v-else-if="currentTab === 'times'">
        <WordCard
          v-for="(word, index) in sortByTimes"
          :key="index"
          :languages="languages"
          :word="word"
          @remember="onRemember"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTranslate } from "@/composable/translate";
import { useRecordStorage } from "@/composable/recordStorage";
import WordCard from "@/components/WordCard.vue";

const { languages, getSupportedLangs } = useTranslate();
const { read: readRecord, remove: removeRecord } = useRecordStorage();

const currentTab = ref("recent");
const showAll = ref(false);
const words = ref([]);

const sortByDate = computed(() => {
  const copyWords = [...words.value];
  copyWords.sort((a, b) => b.date - a.date);
  return copyWords.slice(0, showAll ? undefined : 3);
});
const sortByTimes = computed(() => {
  const copyWords = [...words.value];
  copyWords.sort((a, b) => b.times - a.times);
  return copyWords.slice(0, showAll ? undefined : 3);
});

async function onRemember(word) {
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
  background: #1e1e20;
  color: white;
}
</style>

<style lang="scss" scoped>
.container {
  width: 600px;
  margin: 0 auto;
}

h1 {
  margin: 30px 0;
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tab-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #676e95;
  clear: both;

  .tab-group {
    display: flex;

    .tab {
      padding: 4px 8px;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      border-radius: 8px 8px 0 0;
      font-size: 20px;
      font-weight: 500;
      color: white;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        border-color: #676e95;
      }

      &.active {
        color: #161618;
        background: #676e95;
        border-color: #676e95;
      }
    }
  }

  .display {
    color: #646cff;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #747bff;
    }
  }
}

.group {
  width: 100%;
  max-height: calc(100vh - 200px);
  padding: 10px 0;
  overflow: auto;

  .empty {
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
}
</style>
