import { useState, Dispatch, SetStateAction, useContext } from "react";
import { LuSend } from "react-icons/lu";
import { axiosSendMessage } from "../../API";
import { isAxiosError } from "axios";
import { MessageTypes } from "./AllMessagesContainer";
import DataContext, { DataContextProps } from "../../context/DataContext";

interface MessageSendContainerProps {
  setMessages: Dispatch<SetStateAction<MessageTypes[]>>;
}

export interface MessageToSendTypes {
  content: string;
  selectedChatId: string;
}

const MessageSendContainer = ({ setMessages }: MessageSendContainerProps) => {
  const { selectedChatId } = useContext(DataContext) as DataContextProps;
  const [content, setContent] = useState("");

  const messageToSend: MessageToSendTypes = { content, selectedChatId };

  const sendMessage = async () => {
    try {
      const { data } = await axiosSendMessage(messageToSend);
      setMessages((prev) => [...prev, data]);
      setContent("");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-slate-200  w-full h-24 flex flow-row rounded-xl overflow-hidden">
      <form className="w-5/6 h-20 ">
        <input
          placeholder="Your message..."
          type="text"
          onChange={(e) => setContent(e.target.value)}
          className="px-4 bg-slate-200 w-full h-full  focus:outline-none"
          value={content}
        />
      </form>
      <button
        type="button"
        onClick={() => sendMessage()}
        className="w-1/6 flex justify-center items-center"
      >
        <LuSend size={24} />
      </button>
    </div>
  );
};

export default MessageSendContainer;
