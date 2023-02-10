<template>
  <div>
    <input v-if="allowSearch" type="text" v-model="text" @keydown.enter="onTranslate" />
    <button type="button" @click="onTranslate">翻譯</button>
  </div>
  <div class="result">
    {{ word.result }}
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStorage } from "@/composable/storage";
import { useTranslate } from "@/composable/translate";

defineProps({
  allowSearch: {
    type: Boolean,
    default: true,
  },
});

const text = ref("");
const textLowerCase = computed(() => {
  return text.value.toLocaleLowerCase();
});

const { write } = useStorage();
const { word, translate } = useTranslate();

async function onTranslate() {
  await translate(textLowerCase.value);
  await write({
    search: textLowerCase.value,
    en: word.target === "en" ? word.result : textLowerCase.value,
    zh: word.target === "en" ? textLowerCase.value : word.result,
  });
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
