import { useContext, createContext, useState, useEffect } from 'react';

// Create a context that can be accessed globally by the app, allowing for cleaner
// state management and avoid excessive 'prop drilling'
const globalContext = createContext();

// Create a custom hook that allows access to the global context object
export const useGlobalContext = () => {
  return useContext(globalContext);
};

// Function that decides whether we should start with dark mode or light mode
const getInitialDarkMode = () => {
  // Resume with the previously used mode if it exists in local storage
  const storedPreference = Boolean(localStorage.getItem('darkTheme'));
  if (storedPreference !== null) {
    return storedPreference;
  }

  // Otherwise, go with their browser preference, if known.
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  return prefersDarkMode;
};

// ContextProvider component that will wrap the app (in main.jsx), allowing access to whatever
// state values and functions we care to share, anywhere in the app that they are needed
export const ContextProvider = ({ children }) => {
  // Define state variables for the dark theme and the search phrase, with initial values
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchPhrase, setSearchPhrase] = useState('cat');

  // Function that toggles the dark/light mode. It changes the state variable and also stores
  // it in local storage so that if the app is restarted (web page refreshed) then the mode can be
  // the same as they last chose
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  // Declare a useEffect function that will add or remove the 'dark-theme' CSS class to or from the body
  // element whenever the 'isDarkTheme' state variable changes. Which is when the function above is triggered.
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  // Return the JSX for this ContextProvider component, which wraps the app. The value prop passed down
  // is the state variables and functions that we are giving access to, so that subcomponents can use them.
  return (
    <globalContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchPhrase, setSearchPhrase }}
    >
      {children}
    </globalContext.Provider>
  );
};
