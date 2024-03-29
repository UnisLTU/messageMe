import { useContext, useEffect, useState } from "react";
import { ChatName } from "./ChatName";
import { isAxiosError } from "axios";
import { axiosAllMessages } from "../../API";
import SVG from "../../assets/undraw_duplicate_re_d39g.svg";
import AllMessagesContainer from "./Messages/AllMessagesContainer";
import MessageSendContainer from "./Messages/MessageSendContainer";
import DataContext from "../../context/DataContext";
import { socket } from "./ChatListItem";
import { deleteMessage, editMessage } from "../../utils/messageFunc";
import { DataContextProps } from "../../types/common";
import { MessageTypes } from "../../types/MessagesTypes";
import { MessageEditTypes } from "./Messages/MessageEditFrom";
import ChatNameSkeleton from "./ChatNameSkeleton";
import AllMessagesSkeleton from "./AllMessagesSkeleton";

const ChatBox = () => {
  const { selectedChatId, messages, setMessages } = useContext(
    DataContext
  ) as DataContextProps;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const allMessages = async () => {
      try {
        const { data } = await axiosAllMessages(selectedChatId);
        setMessages(data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedChatId) allMessages();
  }, [selectedChatId]);

  useEffect(() => {
    const messageReceivedHandler = (data: MessageTypes) => {
      if (selectedChatId === data.chat._id)
        setMessages((messages) => [...messages, data]);
    };

    const messageDeleteHandler = (data: MessageEditTypes) => {
      const deletedMessageArray = deleteMessage(data, messages);
      setMessages(deletedMessageArray);
    };

    const messageEditHandler = (data: MessageEditTypes) => {
      const editedMessageArray = editMessage(data, messages);
      setMessages(editedMessageArray);
    };

    socket.on("messageReceived", messageReceivedHandler);
    socket.on("messageDeleted", messageDeleteHandler);
    socket.on("messageEdited", messageEditHandler);

    // Clean up
    return () => {
      socket.off("messageReceived", messageReceivedHandler);
      socket.off("messageDeleted", messageDeleteHandler);
      socket.off("messageEdited", messageEditHandler);
    };
  }, [messages, selectedChatId]);

  return (
    <>
      {selectedChatId ? (
        <div className="md:w-1/2 w-full h-full bg-slate-50 dark:bg-gray-900 rounded-xl flex flex-col p-4 dark:text-white">
          {isLoading ? <ChatNameSkeleton /> : <ChatName />}
          <div className="h-full my-4 space-y-2 flex flex-col justify-end overflow-hidden">
            <div className="flex flex-col overflow-scroll no-scrollbar">
              {isLoading ? <AllMessagesSkeleton /> : <AllMessagesContainer />}
            </div>
          </div>
          <MessageSendContainer />
        </div>
      ) : (
        <div className="md:w-1/2 w-full bg-slate-50 dark:bg-gray-900 rounded-xl justify-center items-center flex flex-col p-4 space-y-4 dark:text-white">
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
