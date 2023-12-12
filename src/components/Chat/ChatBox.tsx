import { useEffect, useState } from "react";
import { ChatName } from "./ChatName";
import { isAxiosError } from "axios";
import { axiosAllMessages } from "../../API";
import SVG from "../../assets/undraw_duplicate_re_d39g.svg";
import { Message } from "../Messages/AllMessagesContainer";
import AllMessagesContainer from "../Messages/AllMessagesContainer";
import MessageSendContainer from "../Messages/MessageSendContainer";

interface ChatBoxProps {
  selectedId: string;
}

const ChatBox = ({ selectedId }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const allMessages = async () => {
      try {
        const { data } = await axiosAllMessages(selectedId);
        setMessages(data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.log(err);
        }
      }
    };

    allMessages();
  }, [selectedId]);

  return (
    <>
      {selectedId ? (
        <div className="w-1/2 bg-slate-50 rounded-xl flex flex-col p-4">
          <ChatName />
          <div className="h-full my-4 space-y-2 flex flex-col justify-end overflow-hidden">
            <div className="flex flex-col overflow-scroll no-scrollbar">
              <AllMessagesContainer messages={messages} />
            </div>
          </div>
          <MessageSendContainer
            selectedId={selectedId}
            setMessages={setMessages}
          />
        </div>
      ) : (
        <div className="w-1/2 bg-slate-50 rounded-xl justify-center items-center flex flex-col p-4 space-y-4">
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
