<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import ButtonCom from "./components/Button.vue";
import { getImageUrl } from "./utils/index";
import imgUrl from "./assets/vue.svg";
const vite = getImageUrl("/vite.svg");
console.log(imgUrl, vite);
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img :src="`${vite}`" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img
        :src="`${imgUrl}`"
        class="logo vue"
        alt="Vue
      logo"
      />
    </a>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <ButtonCom msg="远程应用 ：：cpp + btn" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
