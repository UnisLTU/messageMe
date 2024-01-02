import NewPersonalChatModal from "../components/Modals/NewPersonalChatModal";
import DataContext from "../context/DataContext";
import ChatDesktop from "../components/Chat/ChatDesktop/ChatDesktop";
import SettingsModal from "../components/Modals/SettingsModal";
import ChatMobile from "../components/Chat/ChatMobile";
import { useContext, useEffect } from "react";
import { axiosFetchChats } from "../API";
import { isAxiosError } from "axios";
import ChatBoxModal from "../components/Modals/ChatBoxModal";
import NewGroupChatModal from "../components/Modals/NewGroupChatModal";
import io from "socket.io-client";
import { DataContextProps } from "../types/common";
export const socket = io("http://localhost:4000");

export enum ModalsEnum {
  SETTINGS = "settings",
  NEW_PERSONAL_CHAT = "newPersonalChat",
  NEW_GROUP_CHAT = "newGroupChat",
  CHAT = "chat",
  NOT_SHOW = "",
}

const Chat = () => {
  const { userData, setChats, setIsMobile, isMobile, modal, refetch } =
    useContext(DataContext) as DataContextProps;

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
  }, [userData, refetch]);

  const modalView = () => {
    switch (modal) {
      case ModalsEnum.NEW_PERSONAL_CHAT:
        return <NewPersonalChatModal />;
      case ModalsEnum.SETTINGS:
        return <SettingsModal />;
      case ModalsEnum.NEW_GROUP_CHAT:
        return <NewGroupChatModal />;
      case ModalsEnum.CHAT:
        return <ChatBoxModal />;
      default:
        return null;
    }
  };

  // const groupChats: ChatData[] =
  //   chats?.filter(({ isGroupChat }) => isGroupChat) || [];

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 880) setIsMobile(false);
      if (window.innerWidth < 880) setIsMobile(true);
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <ChatMobile />
      ) : (
        <>
          <ChatDesktop />
        </>
      )}
      {modalView()}
    </>
  );
};

export default Chat;
