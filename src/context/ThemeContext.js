import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { themes, primary_colors } from '../helpers/theme';

const ThemeContext = createContext();
let defaultTheme = themes.find((x) => x.name === 'Guava');
const defaultColor = primary_colors[0];
defaultTheme.colors.component.primary = defaultColor;
// const defaultTheme = themes.find((x) => x.name === 'Luong');
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useThemeContext = () => useContext(ThemeContext);
export default ThemeProvider;
