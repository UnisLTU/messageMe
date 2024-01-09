import { useContext, useEffect, useRef } from "react";
import { Message } from "./Message";
import DataContext from "../../../context/DataContext";
import { DataContextProps } from "../../../types/common";

const AllMessagesContainer = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { messages } = useContext(DataContext) as DataContextProps;

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex h-full flex-col overflow-scroll no-scrollbar space-y-2">
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default AllMessagesContainer;
