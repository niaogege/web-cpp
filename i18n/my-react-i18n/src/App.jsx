import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import i18n from "i18next";
import { useTranslation, Trans } from "react-i18next";
import Welcome from "./page";
const langs = {
  en: { nativeName: "English" },
  zh: { nativeName: "中文" },
};
function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const changeLan = (evt) => {
    i18n.changeLanguage(evt.target.value);
  };
  return (
    <div className="App">
      <header>
        <select onChange={changeLan}>
          {Object.keys(langs).map((lng) => (
            <option
              key={lng}
              value={lng}
              label={langs[lng].nativeName}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
            />
          ))}
        </select>
      </header>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Welcome />
      <p>{t("welcome")}</p>
      <Trans i18nKey="author">
        作者是: <code>'cpp'</code>
      </Trans>
    </div>
  );
}

export default App;
