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

    document.body.classList.toggle('dark-theme', newDarkTheme);
  };

  return (
    <globalContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </globalContext.Provider>
  );
};
