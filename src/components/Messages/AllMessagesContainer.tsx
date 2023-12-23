import { useEffect, useRef } from "react";
import { Message } from "./Message";
import { UserDataTypes } from "../../context/DataContext";

export interface AllMessagesProps {
  messages: MessageTypes[];
}

export interface MessageTypes {
  _id: string;
  content: string;
  createdAt: string;
  sender: UserDataTypes;
}

const AllMessagesContainer = ({ messages }: AllMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
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
