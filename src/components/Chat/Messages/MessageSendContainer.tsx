import { useState, useContext, FormEvent } from "react";
import { LuSend } from "react-icons/lu";
import { axiosSendMessage } from "../../../API";
import { isAxiosError } from "axios";
import DataContext from "../../../context/DataContext";
import { socket } from "../ChatListItem";
import { DataContextProps } from "../../../types/common";

export interface MessageToSendTypes {
  content: string;
  chatId: string;
}

const MessageSendContainer = () => {
  const { selectedChatId, setMessages } = useContext(
    DataContext
  ) as DataContextProps;
  const [content, setContent] = useState("");

  const chatId = selectedChatId;

  const messageToSend: MessageToSendTypes = { content, chatId };

  const sendMessage = async () => {
    try {
      const { data } = await axiosSendMessage(messageToSend);
      if (data) {
        socket.emit("newMessage", { data });
        setMessages((prev) => [...prev, data]);
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) console.log(err);
    } finally {
      setContent("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="bg-slate-200 dark:bg-gray-950 w-full h-24 flex flow-row rounded-xl overflow-hidden">
      <form className="w-5/6 h-20 " onSubmit={handleSubmit}>
        <input
          placeholder="Your message..."
          type="text"
          onChange={(e) => setContent(e.target.value)}
          className="px-4 bg-slate-200 w-full h-full focus:outline-none dark:bg-gray-950"
          value={content}
        />
        <button type="submit" className="hidden" />
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
