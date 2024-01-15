import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import { Main } from "./pages/Main";
import ErrorPage from "./ErrorPage";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    localStorage.theme === "dark" || !("theme" in localStorage)
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    localStorage.theme === "dark"
      ? (localStorage.theme = "light")
      : (localStorage.theme = "dark");
  }, []);

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
