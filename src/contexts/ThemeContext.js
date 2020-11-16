import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    isLightTheme: true,
    light: {
      mainColor: "#fff",
      subColor: "#ffc38b",
      buttonColor: "#ff926b",
      bgColor: "#fff",
      textColor: "#000",
      listColor: "#f0f0f0",
    },
    dark: {
      mainColor: "#686d76",
      subColor: "#0d7377",
      buttonColor: "#e94560",
      bgColor: "#000",
      textColor: "#fff",
      listColor: "#0f3460",
    },
  });
  const toggleTheme = e => {
    setTheme({ ...theme, isLightTheme: !theme.isLightTheme });
  };
  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
