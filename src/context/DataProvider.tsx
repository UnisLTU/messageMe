import { useNavigate } from "react-router-dom";
import DataContext from "./DataContext";
import { useEffect, useState } from "react";
import { ModalsEnum } from "../pages/Chat";
import { SendersInfoTypes, UserDataTypes } from "../types/UserTypes";
import { ChatDataTypes } from "../types/ChatTypes";
import { MessageTypes } from "../types/MessagesTypes";

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserDataTypes>();
  const [chats, setChats] = useState<ChatDataTypes[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<SendersInfoTypes>({
    senderPic: undefined,
    senderName: undefined,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [modal, setModal] = useState(ModalsEnum.NOT_SHOW);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [groupAdminId, setGroupAdminId] = useState("");
  const [chatUsers, setChatUsers] = useState<UserDataTypes[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === "dark");

  useEffect(() => {
    const storageUser = localStorage.getItem("userData");
    if (storageUser) {
      const userDataFromStorage = JSON.parse(storageUser);
      setUserData(userDataFromStorage);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        chats,
        setChats,
        selectedChatUser,
        setSelectedChatUser,
        isMobile,
        setIsMobile,
        selectedChatId,
        setSelectedChatId,
        modal,
        setModal,
        isGroupChat,
        setIsGroupChat,
        groupChatName,
        setGroupChatName,
        messages,
        setMessages,
        groupAdminId,
        setGroupAdminId,
        chatUsers,
        setChatUsers,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
