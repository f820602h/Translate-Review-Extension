import browser from "webextension-polyfill";
import { useStorage } from "@/composable/storage";

browser.runtime.onInstalled.addListener(async () => {
  const { init } = useStorage();
  await init();
});
