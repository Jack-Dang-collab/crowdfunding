import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../context/themeContext';

const ThemeProvider = ({ children, initialTheme = 'light' }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || initialTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
