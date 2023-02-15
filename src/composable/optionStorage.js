import browser from "webextension-polyfill";

export const STORAGE_KEY = "translate_review_options";

const defaultOptions = {
  first_lang: "zh-TW",
  foreign_lang: "en",
};

export function useOptionStorage() {
  async function init() {
    if (!(await read())) {
      browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify({ ...defaultOptions }) });
    }
  }

  async function read() {
    const result = await browser.storage.sync.get(STORAGE_KEY);
    return result[STORAGE_KEY] ? { ...JSON.parse(result[STORAGE_KEY]) } : false;
  }

  async function write({ key, value }) {
    const newData = await read();
    const isValidOption = Object.keys(defaultOptions).indexOf(key) > -1;
    if (isValidOption) {
      newData[key] = value;
      browser.storage.sync.set({ [STORAGE_KEY]: JSON.stringify(newData) });
    } else {
      throw new Error("不存在的設定選項");
    }
  }

  async function reset() {
    for (let key in defaultOptions) {
      await write({ key, value: defaultOptions[key] });
    }
  }

  return {
    init,
    read,
    write,
    reset,
  };
}
