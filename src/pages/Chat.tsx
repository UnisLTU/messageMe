import { useCallback, useEffect, useState } from "react";
import ChatDesktop from "../components/Chat/ChatDesktop";
import ChatMobile from "../components/Chat/ChatMobile";

const Chat = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return <>{windowSize > 768 ? <ChatDesktop /> : <ChatMobile />}</>;
};

export default Chat;
