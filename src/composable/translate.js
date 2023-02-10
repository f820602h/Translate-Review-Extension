import axios from "axios";
import { computed, reactive, ref } from "vue";

export function useTranslate() {
  const key = "AIzaSyAiVZdQkX_LwQ2gDW9_vx31J7jYc0QWdNo";
  const source = ref("");
  const target = computed(() => (source.value.toLocaleLowerCase() === "zh-tw" ? "en" : "zh-tw"));
  const result = ref("");

  async function translate(text) {
    const detectRes = await axios.post("https://translation.googleapis.com/language/translate/v2/detect", null, {
      params: { key, q: text },
    });
    source.value = [...detectRes.data.data.detections[0]].sort((a, b) => a.confidence - b.confidence)[0].language;

    const translateRes = await axios.post("https://translation.googleapis.com/language/translate/v2", null, {
      params: { key, q: text, source: source.value, target: target.value },
    });
    result.value = translateRes.data.data.translations[0].translatedText;
  }

  function reset() {
    source.value = "";
    result.value = "";
  }

  return {
    word: reactive({
      source,
      target,
      result,
    }),
    translate,
    reset,
  };
}
