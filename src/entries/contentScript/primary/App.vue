<template>
  <div v-show="show" class="tool" ref="toolElement" @mousedown.stop>
    <button v-if="!word.result" type="button" @click="onTranslate">翻譯</button>
    <div v-else class="result">{{ word.result }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStorage } from "@/composable/storage";
import { useTranslate } from "@/composable/translate";

const show = ref(false);
const toolElement = ref(null);

const text = ref("");
const textLowerCase = computed(() => {
  return text.value.toLocaleLowerCase();
});

const { write } = useStorage();
const { word, translate, reset } = useTranslate();

async function onTranslate() {
  await translate(textLowerCase.value);
  await write({
    search: textLowerCase.value,
    en: word.target === "en" ? word.result : textLowerCase.value,
    zh: word.target === "en" ? textLowerCase.value : word.result,
  });
}

window.addEventListener("mousedown", () => {
  show.value = false;
  text.value = "";
  reset();
});

window.addEventListener("mouseup", () => {
  const selectionObject = window.getSelection();
  text.value = selectionObject.toString().trim().toLocaleLowerCase();
  if (!!text.value) {
    show.value = true;
    moveToolElement();
  }
});

function moveToolElement() {
  const markerTextChar = "\ufeff";
  const markerTextCharEntity = "&#xfeff;";
  const markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substring(2);
  let markerEl;

  const sel = window.getSelection();
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(false);

  markerEl = window.document.createElement("span");
  markerEl.id = markerId;
  markerEl.appendChild(window.document.createTextNode(markerTextChar));
  range.insertNode(markerEl);

  if (markerEl) {
    let obj = markerEl;
    let left = 0;
    let top = 0;
    do {
      left += obj.offsetLeft;
      top += obj.offsetTop;
    } while ((obj = obj.offsetParent));

    toolElement.value.style.left = left + "px";
    toolElement.value.style.top = top + "px";

    markerEl.parentNode.removeChild(markerEl);
  }
}
</script>

<style scoped>
.tool {
  position: absolute;
  z-index: 99999;
}

button {
  position: relative;
  top: -36px;
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
  position: relative;
  top: -40px;
  padding: 4px 8px;
  border-width: 1px;
  border-style: solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  border-image-source: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: #1e1e20;
}
</style>
