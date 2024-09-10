import { useGlobalContext } from './context';
import { FaMoon, FaSun } from 'react-icons/fa'; // Pull in some nifty icons for the sun and moon symbols

// The ThemeToggle component, which is effectively just the sun/moon button to control light/dark mode.
// When the user clicks on it, we invoke the toggleDarkTheme() function in global context. We also check the
// 'isDarkTheme' state variable from there to determine whether to show the sun or the moon.
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <section className='toggle-container'>
      <button className='dark-toggle' onClick={() => toggleDarkTheme()}>
        {isDarkTheme ? (
          <FaMoon className='toggle-icon' />
        ) : (
          <FaSun className='toggle-icon' />
        )}
      </button>
    </section>
  );
};
export default ThemeToggle;
