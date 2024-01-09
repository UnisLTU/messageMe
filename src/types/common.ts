import { Dispatch, SetStateAction } from "react";
import { SendersInfoTypes, UserDataTypes } from "./UserTypes";
import { ChatDataTypes } from "./ChatTypes";
import { ModalsEnum } from "../pages/Chat";
import { MessageTypes } from "./MessagesTypes";

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
  isGroupChat: boolean;
  setIsGroupChat: Dispatch<SetStateAction<boolean>>;
  groupChatName: string;
  setGroupChatName: Dispatch<SetStateAction<string>>;
  messages: MessageTypes[];
  setMessages: Dispatch<SetStateAction<MessageTypes[]>>;
  groupAdminId: string;
  setGroupAdminId: Dispatch<SetStateAction<string>>;
  chatUsers: UserDataTypes[];
  setChatUsers: Dispatch<SetStateAction<UserDataTypes[]>>;
}
