import { useState, Dispatch, SetStateAction } from "react";
import { LuSend } from "react-icons/lu";
import { axiosSendMessage } from "../../API";
import { isAxiosError } from "axios";
import { MessageTypes } from "./AllMessagesContainer";

interface MessageSendContainerProps {
  selectedId: string;
  setMessages: Dispatch<SetStateAction<MessageTypes[]>>;
}

export interface MessageToSendTypes {
  content: string;
  chatId: string;
}

const MessageSendContainer = ({
  selectedId,
  setMessages,
}: MessageSendContainerProps) => {
  const [content, setContent] = useState("");

  const chatId = selectedId;
  const messageToSend: MessageToSendTypes = { content, chatId };

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