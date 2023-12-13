import { SlPlus } from "react-icons/sl";
import { ChatListItem } from "./ChatListItem";
import { Navigation } from "./Navigation/Navigation";
import DataContext, {
  ChatDataTypes,
  DataContextProps,
} from "../../context/DataContext";
import { useState, useContext, useEffect } from "react";
import NewPersonalChatModal from "../Modals/NewPersonalChatModal";
import ChatBox from "./ChatBox";
import { SendersInfo } from "../../utils/SendersInfo";
import SettingsModal from "../Modals/SettingsModal";

export enum ModalsEnum {
  SETTINGS = "settings",
  NEW_PERSONAL_CHAT = "newPersonalChat",
  NEW_GROUP_CHAT = "newGroupChat",
  CHAT = "chat",
  NOT_SHOW = "",
}

const ChatDesktop = () => {
  const { setChats, chats, setSelectedChat, userData } = useContext(
    DataContext
  ) as DataContextProps;

  const [selectedId, setSelectedId] = useState("");
  const [personalChats, setPersonalChats] = useState<ChatDataTypes[]>([]);
  const [modal, setModal] = useState(ModalsEnum.NOT_SHOW);

  const modalView = () => {
    switch (modal) {
      case ModalsEnum.NEW_PERSONAL_CHAT:
        return (
          <NewPersonalChatModal
            createNewPersonalChat={createNewPersonalChat}
            setModal={setModal}
          />
        );
      case ModalsEnum.SETTINGS:
        return <SettingsModal setModal={setModal} />;
      case ModalsEnum.NEW_GROUP_CHAT:
        return (
          <NewPersonalChatModal
            createNewPersonalChat={createNewPersonalChat}
            setModal={setModal}
          />
        );
      case ModalsEnum.CHAT:
        return (
          <NewPersonalChatModal
            createNewPersonalChat={createNewPersonalChat}
            setModal={setModal}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // Update personalChats whenever chats changes
    if (chats) {
      const updatedPersonalChats = chats.filter(
        ({ isGroupChat }) => !isGroupChat
      );

      setPersonalChats(updatedPersonalChats);
    }
  }, [chats]);

  const createNewPersonalChat = (newChat: ChatDataTypes) => {
    const doesChatExist = personalChats.some(
      (item) => item._id === newChat._id
    );

    if (doesChatExist) {
      const sender = SendersInfo(userData, newChat);
      setSelectedChat(sender);
      setSelectedId(newChat._id);
      return;
    } else {
      setChats((prevChats) => [newChat, ...prevChats]);
      const sender = SendersInfo(userData, newChat);
      setSelectedChat(sender);
      setSelectedId(newChat._id);
    }
  };

  // const groupChats: ChatData[] =
  //   chats?.filter(({ isGroupChat }) => isGroupChat) || [];

  return (
    <>
      <div className="flex flex-col max-w-[1920px] w-full bg-slate-400 h-screen p-10">
        <div className="max-w-full shadow-md bg-slate-200 rounded-xl p-8 flex flex-row space-x-4 max-h-full min-h-full">
          <Navigation setModal={setModal} />
          <div className="w-full space-y-4 h-full flex flex-col">
            <div className="w-full h-full space-x-4 flex flex-row">
              <div className="w-1/2">
                <div className="h-1/2 w-full pb-14">
                  <div className="w-full pb-4 flex flex-row justify-between">
                    <h1>Personal messages:</h1>
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
                      personalChats.map((chat) => (
                        <ChatListItem
                          key={chat._id}
                          chat={chat}
                          selectedId={selectedId}
                          setSelectedId={setSelectedId}
                        />
                      ))
                    ) : (
                      <div>Loading</div>
                    )}
                  </div>
                </div>
                <div className="h-1/2 w-full">
                  <div className="w-full pb-4 flex flex-row justify-between">
                    <h1>Group chats:</h1>
                    <button className="flex flex-row space-x-2" type="button">
                      <h1>Start new group chat</h1>
                      <SlPlus
                        onClick={() => setModal(ModalsEnum.NEW_GROUP_CHAT)}
                        size={24}
                      />
                    </button>
                  </div>
                  <div className="h-full w-full overflow-y-scroll no-scrollbar space-y-4">
                    {/*chats ? {groupChats.map((chat) => 
                    return (
                      <GroupChatBanner
                        key={chat._id} chat={chat}
                      />
                    );
                  ) : (<div>Loading</div>)} */}
                  </div>
                </div>
              </div>
              <ChatBox selectedId={selectedId} />
            </div>
          </div>
        </div>
      </div>
      {modalView()}
    </>
  );
};

export default ChatDesktop;
