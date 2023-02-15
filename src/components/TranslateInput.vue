<template>
  <div>
    <input type="text" v-model="text" @keydown.enter="onTranslate" />
    <button type="button" @click="onTranslate">翻譯</button>
  </div>
  <div v-if="word.result" class="result">
    {{ word.result }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useOptionStorage } from "@/composable/optionStorage";
import { useRecordStorage } from "@/composable/recordStorage";
import { useTranslate } from "@/composable/translate";

const options = ref({});
const text = ref("");

const { write: writeRecord } = useRecordStorage();
const { read: readOption } = useOptionStorage();
const { word, translate } = useTranslate();

onMounted(async () => {
  options.value = await readOption();
});

async function onTranslate() {
  await translate(text.value, options.value);
  await writeRecord(word);
}
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
}

input {
  margin-right: 4px;
  padding: 5px 6px;
  border-radius: 4px;
  border: 1px solid #646cff;
  font-size: 14px;
  background: #161618;
  color: white;
  outline: none;
}

input:focus {
  outline: none;
}

button {
  flex-shrink: 0;
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

button:hover {
  background: #747bff;
}

.result {
  margin-top: 12px;
  padding: 0 4px;
  font-size: 18px;
  font-weight: bold;
}
</style>
