<template>
  <div class="logo">
    <!-- <img :src="logoImageUrl" height="50" alt="" /> -->
  </div>
</template>

<script setup>
import logo from "@/assets/logo.svg";

import axios from "axios";
import { onMounted } from "vue";

onMounted(async () => {
  const res = await axios.post("https://translation.googleapis.com/language/translate/v2/detect", null, {
    params: { q: "mom", key: "AIzaSyAiVZdQkX_LwQ2gDW9_vx31J7jYc0QWdNo" },
  });
  console.log(res, res.data);
});

const logoImageUrl = new URL(logo, import.meta.url).href;
</script>

<style scoped>
.logo {
  z-index: 99999;
  position: fixed;
  bottom: 20px;
  right: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #c72a21;
  border-radius: 50%;
  background-color: #fff;
}

img {
  position: absolute;
  top: 7px;
}
</style>
