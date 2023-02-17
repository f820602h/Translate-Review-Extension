import axios from "axios";
import { reactive, ref } from "vue";

export function useTranslate() {
  const key = "YOUR_API_KEY";

  const languages = ref([]);
  async function getSupportedLangs() {
    const langRes = await axios.post("https://translation.googleapis.com/language/translate/v2/languages", null, {
      params: { key, target: "zh-TW" },
    });
    languages.value = langRes.data.data.languages;
  }

  const word = reactive({
    search: "",
    chinese: "",
    foreign: "",
    lang: "",
    result: "",
  });
  async function translate(text, options) {
    const detectRes = await axios.post("https://translation.googleapis.com/language/translate/v2/detect", null, {
      params: { key, q: text },
    });
    const source = [...detectRes.data.data.detections[0]].sort((a, b) => a.confidence - b.confidence)[0].language;
    const isSourceChinese = source.indexOf("zh") > -1;
    const isFirstLangChinese = options.first_lang.indexOf("zh") > -1;
    const isSourceEqualFirstLang = source === options.first_lang;
    const target = isSourceEqualFirstLang
      ? options.foreign_lang
      : !isSourceEqualFirstLang && isSourceChinese && isFirstLangChinese
      ? options.foreign_lang
      : options.first_lang;
    const isTargetEqualFirstLang = target === options.first_lang;

    const translateRes = await axios.post("https://translation.googleapis.com/language/translate/v2", null, {
      params: { key, q: text, source: source, target: target },
    });
    word.search = text;
    word.result = translateRes.data.data.translations[0].translatedText;
    word.firstLang = options.first_lang;
    word.foreignLang = options.foreign_lang;
    word.first = isTargetEqualFirstLang ? word.result : word.search;
    word.foreign = isTargetEqualFirstLang ? word.search : word.result;
  }

  function reset() {
    word.search = "";
    word.first = "";
    word.foreign = "";
    word.lang = "";
    word.result = "";
  }

  return {
    languages,
    word,
    getSupportedLangs,
    translate,
    reset,
  };
}
