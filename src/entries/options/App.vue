<template>
  <div class="container">
    <h1>Translate Review</h1>

    <div class="option">
      <div>
        <h3>Your First Language ?</h3>
        <span>translate all foreign languages into this language</span>
      </div>
      <select
        :value="options.first_lang"
        @change="() => writeOption({ key: 'first_lang', value: $event.target.value })"
      >
        <option
          v-for="lang in languages"
          :key="lang.language"
          :value="lang.language"
          :disabled="lang.language === options.foreign_lang"
        >
          {{ lang.name }}
        </option>
      </select>
    </div>

    <div class="option">
      <div>
        <h3>Your Target Language ?</h3>
        <span>translate your first languages into this language</span>
      </div>
      <select
        :value="options.foreign_lang"
        @change="() => writeOption({ key: 'foreign_lang', value: $event.target.value })"
      >
        <option
          v-for="lang in languages"
          :key="lang.language"
          :value="lang.language"
          :disabled="lang.language === options.first_lang"
        >
          {{ lang.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useOptionStorage } from "@/composable/optionStorage";
import { useTranslate } from "@/composable/translate";

const options = ref({});

const { read: readOption, write: writeOption } = useOptionStorage();
const { languages, getSupportedLangs } = useTranslate();

onMounted(async () => {
  await getSupportedLangs();
  options.value = await readOption();
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Titillium Web", sans-serif;
  padding: 30px;
  background: #1e1e20;
  color: white;
}

.container {
  width: 600px;
  margin: 0 auto;
}

h1 {
  margin: 0 0 30px 0;
  padding: 0 30px 8px 30px;
  /* border-bottom: 2px solid #646cff; */
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  /* color: #646cff; */
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h3 {
  font-size: 20px;
  font-weight: 500;
  color: white;
}

select {
  width: 150px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #676e95;
  background: #161618;
  color: #bcc0ff;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.option span {
  font-size: 14px;
  font-weight: normal;
  color: #676e95;
}
</style>
