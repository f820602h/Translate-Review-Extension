import browser from "webextension-polyfill";
import { useOptionStorage } from "@/composable/optionStorage";
import { useRecordStorage } from "@/composable/recordStorage";

browser.runtime.onInstalled.addListener(async () => {
  const { init: initOption } = useOptionStorage();
  const { init: initRecord } = useRecordStorage();
  await initOption();
  await initRecord();
});
