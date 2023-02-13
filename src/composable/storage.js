import { onBeforeMount } from "vue";
import browser from "webextension-polyfill";

export const STORAGE_KEY = "translate_review_words";

export function useStorage() {
  async function read() {
    const result = await browser.storage.sync.get(STORAGE_KEY);
    return result[STORAGE_KEY] ? [...JSON.parse(result[STORAGE_KEY])] : false;
  }

  async function write({ search, en, zh }) {
    const now = new Date().getTime();
    const newData = await read();
    const searchedWord = newData.find((word) => {
      return word.en === en && word.zh === zh;
    });

    if (searchedWord) {
      searchedWord.times += 1;
      searchedWord.date = now;
      if (!searchedWord.show) {
        searchedWord.show = true;
        searchedWord.forget = true;
      }
    } else {
      newData.push({ search, en, zh, times: 1, date: now, show: true, forget: false });
    }

    browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify(newData) });
  }

  async function remove(target) {
    const newData = await read();
    const targetWord = newData.find((word) => {
      return word.en === target.en && word.zh === target.zh;
    });
    targetWord.show = false;

    browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify(newData) });
  }

  async function init() {
    if (!(await read())) {
      browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify([]) });
    }
  }

  onBeforeMount(() => {
    init();
  });

  return {
    read,
    write,
    remove,
    init,
  };
}
