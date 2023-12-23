import { SlPlus } from "react-icons/sl";
import { Navigation } from "./Navigation/Navigation";
import { ChatListItem } from "./ChatListItem";
import { useContext } from "react";
import DataContext, { DataContextProps } from "../../context/DataContext";
import { ModalsEnum } from "../../pages/Chat";

const ChatMobile = () => {
  const { chats, setModal } = useContext(DataContext) as DataContextProps;
  return (
    <>
      <div className="w-full h-[calc(100%-70px)] p-4 flex flex-col bg-slate-200">
        <h1 className="text-center font-bold text-2xl pb-4 tracking-widest">
          MessageMe App
        </h1>
        <div className="h-1/2 w-full pb-14">
          <div className="w-full pb-4 flex flex-row justify-between">
            <h1 className="font-bold text-lg">Personal chats</h1>
            <button className="flex flex-row space-x-2" type="button">
              <h1>Start new chat</h1>
              <SlPlus
                onClick={() => setModal(ModalsEnum.NEW_PERSONAL_CHAT)}
                size={24}
              />
            </button>
          </div>
          <div className="h-full w-full overflow-y-scroll no-scrollbar space-y-4">
            {chats ? (
              chats
                .filter(({ isGroupChat }) => !isGroupChat)
                .map((chat) => <ChatListItem key={chat._id} chat={chat} />)
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
        <div className="h-1/2 w-full pb-10">
          <div className="w-full pb-4 flex flex-row justify-between">
            <h1 className="font-bold text-lg">Group chats</h1>
            <button className="flex flex-row space-x-2" type="button">
              <h1>Start new chat</h1>
              <SlPlus
                onClick={() => setModal(ModalsEnum.NEW_GROUP_CHAT)}
                size={24}
              />
            </button>
          </div>
          <div className="h-full w-full overflow-y-scroll no-scrollbar space-y-4">
            {chats ? (
              chats
                .filter(({ isGroupChat }) => isGroupChat)
                .map((chat) => <ChatListItem key={chat._id} chat={chat} />)
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </>
  );
};

export default ChatMobile;
