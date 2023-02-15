import browser from "webextension-polyfill";

export const STORAGE_KEY = "translate_review_words";

export function useRecordStorage() {
  async function init() {
    if (!(await read())) {
      browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify([]) });
    }
  }

  async function read() {
    const result = await browser.storage.sync.get(STORAGE_KEY);
    return result[STORAGE_KEY] ? [...JSON.parse(result[STORAGE_KEY])] : false;
  }

  async function write({ search, first, foreign, firstLang, foreignLang }) {
    const now = new Date().getTime();
    const newData = await read();
    const searchedWord = newData.find((word) => {
      return (
        word.foreign.toLocaleLowerCase() === foreign.toLocaleLowerCase() &&
        word.first.toLocaleLowerCase() === first.toLocaleLowerCase()
      );
    });

    if (searchedWord) {
      searchedWord.times += 1;
      searchedWord.date = now;
      if (!searchedWord.show) {
        searchedWord.show = true;
        searchedWord.forget = true;
      }
    } else {
      newData.push({ search, foreign, first, firstLang, foreignLang, times: 1, date: now, show: true, forget: false });
    }

    browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify(newData) });
  }

  async function remove(target) {
    const newData = await read();
    const targetWord = newData.find((word) => {
      return (
        word.foreign.toLocaleLowerCase() === target.foreign.toLocaleLowerCase() &&
        word.first.toLocaleLowerCase() === target.first.toLocaleLowerCase()
      );
    });
    targetWord.show = false;

    browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify(newData) });
  }

  return {
    init,
    read,
    write,
    remove,
  };
}
