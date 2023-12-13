import { createContext, Dispatch, SetStateAction } from "react";
import { SendersInfoTypes } from "../components/Chat/ChatListItem";

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
  selectedChat: SendersInfoTypes;
  setSelectedChat: Dispatch<SetStateAction<SendersInfoTypes>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export default DataContext;
