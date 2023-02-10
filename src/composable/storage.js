import browser from "webextension-polyfill";

export const STORAGE_KEY = "translate_review_words";

export function useStorage() {
  async function read() {
    const result = await browser.storage.sync.get(STORAGE_KEY);
    return result[STORAGE_KEY] ? [...JSON.parse(result[STORAGE_KEY])] : false;
  }

  async function write({ search, en, zh }) {
    const newData = await read();
    const searchedWord = newData.find((word) => word.search === search);

    if (searchedWord) searchedWord.times += 1;
    else newData.push({ search, en, zh, times: 1 });

    browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify(newData) });
  }

  async function init() {
    if (!(await read())) {
      browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify([]) });
    }
  }

  return {
    read,
    write,
    init,
  };
}
