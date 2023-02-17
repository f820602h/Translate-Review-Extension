import browser from "webextension-polyfill";
import { useOptionStorage } from "@/composable/optionStorage";

browser.runtime.onInstalled.addListener(async () => {
  const { init: initOption } = useOptionStorage();
  await initOption();
});
