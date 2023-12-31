import { useContext } from "react";
import DataContext, {
  ChatDataTypes,
  DataContextProps,
} from "../../context/DataContext";
import { SendersInfo } from "../../utils/SendersInfo";
import { ModalsEnum } from "../../pages/Chat";

export interface ChatBannerProps {
  chat: ChatDataTypes;
}

export interface SendersInfoTypes {
  senderPic: string | undefined;
  senderName: string | undefined;
}

export const ChatListItem = ({ chat }: ChatBannerProps) => {
  const {
    userData,
    setSelectedChatUser,
    selectedChatId,
    setSelectedChatId,
    setModal,
    isMobile,
    setIsGroupChat,
    setGroupChatName,
  } = useContext(DataContext) as DataContextProps;

  const sendersInfo = SendersInfo(userData, chat);

  const { senderPic, senderName } = sendersInfo;

  const chatId = chat._id;
  const latestMessage = chat.latestMessage?.content;
  const isGroup = chat.isGroupChat;
  const groupName = chat.chatName;

  const handleAccess = async () => {
    setSelectedChatId(chatId);
    if (!isGroup) {
      setIsGroupChat(false);
      setSelectedChatUser(() => sendersInfo);
    } else {
      setIsGroupChat(isGroup);
      setGroupChatName(chat.chatName);
    }
    if (isMobile) {
      setModal(ModalsEnum.CHAT);
    }
  };

  const background =
    selectedChatId === chatId
      ? "bg-slate-200 border-2 border-slate-400"
      : "bg-slate-50";

  return (
    <div
      onClick={handleAccess}
      className={`${background} rounded-xl h-16 shadow-md flex items-center flex-row space-x-4`}
    >
      <img
        className="w-6 h-6 bg-blue-400 rounded-full ml-4"
        src={isGroup ? "" : senderPic}
        alt=""
      />
      <h1 className="shrink-0">{isGroup ? groupName : senderName}</h1>
      <p className="text-sm w-96 truncate">
        {latestMessage && "Last message: " + latestMessage}
      </p>
    </div>
  );
};
