import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import "./style.css";
import App from "./App.vue";

const i18n = createI18n({
  leagcy: false,
  globalInjection: true,
  locale: "zh",
  messages: {
    zh: {
      cpp: {
        name: "陈大鹏",
        age: "年龄31",
      },
    },
    en: {
      cpp: {
        name: "chendap wmh",
        age: "age 31 24",
      },
    },
  },
});

const app = createApp(App);

app.use(i18n);
app.mount("#app");
