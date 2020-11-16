import React, { useContext } from "react";
import TaskField from "./components/TaskField/TaskField";
import { ThemeContext } from "./contexts/ThemeContext";
import { TaskContextProvider } from "./contexts/TaskContext";
import "./App.scss";

function App() {
  const { toggleTheme, light, dark, isLightTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  return (
    <div className="background" style={{ backgroundColor: theme.bgColor }}>
      <label className="switch">
        <input onClick={() => toggleTheme()} type="checkbox" />
        <span className="slider round"></span>
      </label>

      <TaskContextProvider>
        <TaskField theme={theme} />
      </TaskContextProvider>
    </div>
  );
}

export default App;
