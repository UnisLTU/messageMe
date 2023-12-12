import { useNavigate } from "react-router-dom";
import DataContext, { ChatDataTypes, UserDataTypes } from "./DataContext";
import { useEffect, useState } from "react";
import { SendersInfoTypes } from "../components/Chat/ChatListItem";

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserDataTypes>();
  const [chats, setChats] = useState<ChatDataTypes[]>([]);
  const [selectedChat, setSelectedChat] = useState<SendersInfoTypes>([]);

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
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
