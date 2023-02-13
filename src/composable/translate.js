import axios from "axios";
import { computed, reactive, ref } from "vue";

export function useTranslate() {
  const key = "YOUR_GCP_API_KEY"; // https://cloud.google.com/docs/authentication/api-keys
  const source = ref("");
  const target = computed(() => {
    const lang = source.value.toLocaleLowerCase();
    return lang === "zh-tw" || lang === "zh-cn" ? "en" : "zh-tw";
  });
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
