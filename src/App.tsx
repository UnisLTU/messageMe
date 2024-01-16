import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import { Main } from "./pages/Main";
import ErrorPage from "./ErrorPage";
import { useEffect, useContext } from "react";
import DataContext from "./context/DataContext";
import { DataContextProps } from "./types/common";

const App = () => {
  const { isDarkMode } = useContext(DataContext) as DataContextProps;

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-center bg-gray-800 h-screen w-screen">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
