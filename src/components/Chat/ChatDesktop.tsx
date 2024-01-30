import { SlPlus } from "react-icons/sl";
import { ChatListItem } from "./ChatListItem";
import { Navigation } from "./Navigation";
import DataContext from "../../context/DataContext";
import { useContext } from "react";
import ChatBox from "./ChatBox";
import { ModalsEnum } from "../../pages/Chat";
import { DataContextProps } from "../../types/common";
import ChatListSkeleton from "./ChatListSkeleton";

const ChatDesktop = () => {
  const { chats, setModal, isLoadingList } = useContext(
    DataContext
  ) as DataContextProps;

  return (
    <>
      <div className="flex flex-col flex-none max-w-[1920px] w-full bg-slate-400 h-screen p-10 dark:bg-gray-900">
        <div className="max-w-full shadow-md bg-slate-200 rounded-xl p-8 flex flex-row space-x-4 max-h-full min-h-full dark:bg-gray-950">
          <Navigation />
          <div className="w-full space-y-4 h-full flex flex-col">
            <div className="w-full h-full space-x-4 flex flex-row">
              <div className="w-1/2 dark:text-white">
                <div className="h-1/2 w-full pb-14 ">
                  <div className="w-full pb-4 flex flex-row justify-between">
                    <h1>Personal chats</h1>
                    <button className="flex flex-row space-x-2" type="button">
                      <h1>Start new chat</h1>
                      <SlPlus
                        onClick={() => setModal(ModalsEnum.NEW_PERSONAL_CHAT)}
                        size={24}
                      />
                    </button>
                  </div>
                  <div className="h-full w-full overflow-y-scroll no-scrollbar space-y-4">
                    {chats && !isLoadingList ? (
                      chats
                        .filter(({ isGroupChat }) => !isGroupChat)
                        .map((chat) => (
                          <ChatListItem key={chat._id} chat={chat} />
                        ))
                    ) : (
                      <ChatListSkeleton />
                    )}
                  </div>
                </div>
                <div className="h-1/2 w-full pb-10">
                  <div className="w-full pb-4 flex flex-row justify-between">
                    <h1>Group chats</h1>
                    <button className="flex flex-row space-x-2" type="button">
                      <h1>Start new chat</h1>
                      <SlPlus
                        onClick={() => setModal(ModalsEnum.NEW_GROUP_CHAT)}
                        size={24}
                      />
                    </button>
                  </div>
                  <div className="h-full w-full overflow-y-scroll no-scrollbar space-y-4">
                    {chats && !isLoadingList ? (
                      chats
                        .filter(({ isGroupChat }) => isGroupChat)
                        .map((chat) => (
                          <ChatListItem key={chat._id} chat={chat} />
                        ))
                    ) : (
                      <ChatListSkeleton />
                    )}
                  </div>
                </div>
              </div>
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDesktop;
