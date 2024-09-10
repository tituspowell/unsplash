import { useContext, createContext, useState, useEffect } from 'react';

const globalContext = createContext();

export const useGlobalContext = () => {
  return useContext(globalContext);
};

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  return prefersDarkMode;
};

export const ContextProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchPhrase, setSearchPhrase] = useState('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <globalContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchPhrase, setSearchPhrase }}
    >
      {children}
    </globalContext.Provider>
  );
};
