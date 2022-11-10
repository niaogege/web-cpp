<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <h2>{{ $t("cpp.name") }}</h2>
  <h2>{{ $t("cpp.age") }}</h2>
  <span>{{ $i18n.availableLocales }}--{{ $i18n.locale }}</span>
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
