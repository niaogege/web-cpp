import { createContext } from 'react';
const ThemeContext = createContext({
  mode: 'dark'
});
const Home = () => {
  return (
    <ThemeContext.Provider value={{ mode: 'light' }}>
      <div>This is Home</div>
    </ThemeContext.Provider>
  );
};

export default Home;
