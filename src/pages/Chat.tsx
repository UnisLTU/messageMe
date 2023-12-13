import DataContext, { DataContextProps } from "../context/DataContext";
import ChatDesktop from "../components/Chat/ChatDesktop";
import { useContext, useEffect } from "react";
import { axiosFetchChats } from "../API";
import { isAxiosError } from "axios";
import { useState, useCallback } from "react";
import ChatMobile from "../components/Chat/ChatMobile";

const Chat = () => {
  const { userData, setChats } = useContext(DataContext) as DataContextProps;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axiosFetchChats();

        setChats(data);
      } catch (err) {
        if (isAxiosError(err)) {
          console.log(err);
        }
      }
    };

    if (userData) fetchChats();
  }, [userData]);

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth > 768 && isMobile) setIsMobile(false);
    if (window.innerWidth < 768 && !isMobile) setIsMobile(true);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [window.innerWidth]);

  return <>{isMobile ? <ChatMobile /> : <ChatDesktop />}</>;
};

export default Chat;
