import { useContext } from "react";
import DataContext, {
  ChatDataTypes,
  DataContextProps,
} from "../../context/DataContext";
import { SendersInfo } from "../../utils/SendersInfo";

export interface ChatBannerProps {
  chat: ChatDataTypes;
}

export interface SendersInfoTypes {
  senderPic: string | undefined;
  senderName: string | undefined;
}

export const ChatListItem = ({ chat }: ChatBannerProps) => {
  const { userData, setSelectedChatUser, selectedChatId, setSelectedChatId } =
    useContext(DataContext) as DataContextProps;

  const sendersInfo = SendersInfo(userData, chat);

  const { senderPic, senderName } = sendersInfo;

  const chatId = chat._id;
  const latestMessage = chat.latestMessage?.content;

  const handleAccess = async () => {
    setSelectedChatId(chatId);
    setSelectedChatUser(() => sendersInfo);
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
        className="bg-red-400 w-6 h-6 rounded-full ml-4"
        src={senderPic}
        alt=""
      />
      <h1 className="shrink-0">{senderName}</h1>
      <p className="text-sm w-96 truncate">
        {latestMessage && "Last message: " + latestMessage}
      </p>
    </div>
  );
};
