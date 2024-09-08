import { useContext, createContext, useState } from 'react';

const globalContext = createContext();

export const useGlobalContext = () => {
  return useContext(globalContext);
};

export const ContextProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    const body = document.querySelector('body');
    body.classList.toggle('dark-theme', newDarkTheme);
    console.log(body.classList);
  };

  return (
    <globalContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </globalContext.Provider>
  );
};
