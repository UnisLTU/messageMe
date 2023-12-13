import { createContext, Dispatch, SetStateAction } from "react";
import { SendersInfoTypes } from "../components/Chat/ChatListItem";
import { ModalsEnum } from "../pages/Chat";

export interface UserDataTypes {
  _id?: string;
  name?: string;
  email: string;
  token?: string;
  password?: string;
  pic?: string;
}

export interface ChatDataTypes {
  _id: string;
  chatName: string;
  createdAt: string;
  isGroupChat: boolean;
  updatedAt: string;
  latestMessage: LatestMessageTypes;
  users: UserDataTypes[];
}

export interface LatestMessageTypes {
  content: string;
}

export interface DataContextProps {
  userData?: UserDataTypes;
  setUserData: Dispatch<SetStateAction<UserDataTypes | undefined>>;
  chats: ChatDataTypes[];
  setChats: Dispatch<SetStateAction<ChatDataTypes[]>>;
  selectedChatUser: SendersInfoTypes;
  setSelectedChatUser: Dispatch<SetStateAction<SendersInfoTypes>>;
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
  selectedChatId: string;
  setSelectedChatId: Dispatch<SetStateAction<string>>;
  modal: string;
  setModal: Dispatch<SetStateAction<ModalsEnum>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export default DataContext;
