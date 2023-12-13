import { SlPlus } from "react-icons/sl";
import { Navigation } from "./Navigation/Navigation";
import { ChatListItem } from "./ChatListItem";
import { useContext } from "react";
import DataContext, { DataContextProps } from "../../context/DataContext";
import { ModalsEnum } from "../../pages/Chat";

const ChatMobile = () => {
  const { chats, setModal } = useContext(DataContext) as DataContextProps;
  return (
    <div className="flex flex-col w-full h-screen bg-slate-400">
      <div className="text-center text-xl font-semibold mt-2">MessageMe</div>
      <div className="shadow-md bg-slate-200 rounded-xl flex flex-col p-4 m-4 grow shrink">
        <div className="flex flex-col items-center grow shrink">
          <div className="w-full flex justify-between mb-4">
            <div>Personal chats</div>
            <button type="button">
              <SlPlus
                onClick={() => setModal(ModalsEnum.NEW_PERSONAL_CHAT)}
                size={24}
              />
            </button>
          </div>
          <div className="w-full h-32 overflow-y-scroll no-scrollbar space-y-4 shrink grow">
            {chats ? (
              chats
                .filter(({ isGroupChat }) => !isGroupChat)
                .map((chat) => <ChatListItem key={chat._id} chat={chat} />)
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center grow shrink">
          <div className="w-full flex justify-between my-4">
            <div>Personal chats</div>
            <button type="button">
              <SlPlus size={20} />
            </button>
          </div>
          <div className="w-full no-scrollbar space-y-4 shrink grow">
            {chats ? (
              chats
                .filter(({ isGroupChat }) => !isGroupChat)
                .map((chat) => <ChatListItem key={chat._id} chat={chat} />)
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default ChatMobile;
