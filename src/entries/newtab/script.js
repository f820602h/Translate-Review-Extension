const STORAGE_KEY = "translate_review_words";

async function read() {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  return result[STORAGE_KEY] ? [...JSON.parse(result[STORAGE_KEY])] : false;
}

async function write({ search, en, zh }) {
  const newData = await read();
  const searchedWord = newData.find((word) => word.search === search);

  if (searchedWord) searchedWord.times += 1;
  else newData.push({ search, en, zh, times: 1 });

  chrome.storage.sync.set({ [STORAGE_KEY]: JSON.stringify(newData) });
}

async function init() {
  if (!(await read())) {
    chrome.storage.sync.set({ [STORAGE_KEY]: JSON.stringify([]) });
  }
}

(async function () {
  await init();
  console.log(await read());
})();
