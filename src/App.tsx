import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import { Main } from "./pages/Main";
import ErrorPage from "./ErrorPage";

const App = () => {
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
