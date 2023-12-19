import { useNavigate } from "react-router-dom";
import DataContext, { ChatDataTypes, UserDataTypes } from "./DataContext";
import { useEffect, useState } from "react";
import { SendersInfoTypes } from "../components/Chat/ChatListItem";
import { ModalsEnum } from "../pages/Chat";

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
