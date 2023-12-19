import { useContext, useEffect, useState } from "react";
import { ChatName } from "./ChatName";
import { isAxiosError } from "axios";
import { axiosAllMessages } from "../../API";
import SVG from "../../assets/undraw_duplicate_re_d39g.svg";
import { MessageTypes } from "../Messages/AllMessagesContainer";
import AllMessagesContainer from "../Messages/AllMessagesContainer";
import MessageSendContainer from "../Messages/MessageSendContainer";
import DataContext, { DataContextProps } from "../../context/DataContext";

const ChatBox = () => {
  const { selectedChatId } = useContext(DataContext) as DataContextProps;
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  useEffect(() => {
    const allMessages = async () => {
      try {
        const { data } = await axiosAllMessages(selectedChatId);
        setMessages(data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.log(err);
        }
      }
    };

    if (selectedChatId) allMessages();
  }, [selectedChatId]);

  return (
    <>
      {selectedChatId ? (
        <div className="md:w-1/2 w-full h-full bg-slate-50 rounded-xl flex flex-col p-4">
          <ChatName />
          <div className="h-full my-4 space-y-2 flex flex-col justify-end overflow-hidden">
            <div className="flex flex-col overflow-scroll no-scrollbar">
              <AllMessagesContainer messages={messages} />
            </div>
          </div>
          <MessageSendContainer setMessages={setMessages} />
        </div>
      ) : (
        <div className="md:w-1/2 w-full bg-slate-50 rounded-xl justify-center items-center flex flex-col p-4 space-y-4">
          <img className="h-64" src={SVG} alt="" />
          <h1 className="text-xl font-semibold">
            Select chat from list of chats
          </h1>
        </div>
      )}
    </>
  );
};

export default ChatBox;
