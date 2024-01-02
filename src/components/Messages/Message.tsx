import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import { axiosRemoveMessage } from "../../API";
import { isAxiosError } from "axios";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import MessageContent from "./MessageContent";
import MessageEditFrom from "./MessageEditFrom";
import { socket } from "../Chat/ChatListItem";
import { MessageTypes } from "../../types/MessagesTypes";
import { DataContextProps } from "../../types/common";
import { deleteMessage } from "../../utils/messageFunc";

interface MessageProps {
  message: MessageTypes;
}

export const Message = ({ message }: MessageProps) => {
  const { content, createdAt, sender, _id, isDeleted } = message;
  const { userData, setMessages, messages } = useContext(
    DataContext
  ) as DataContextProps;
  const [isEditMessage, setIsEditMessage] = useState(false);

  const handleDelete = async () => {
    try {
      const { data } = await axiosRemoveMessage(_id);
      console.log(data);
      socket.emit("deleteMessage", { data });

      const deletedMessageArray = deleteMessage(data, messages);
      setMessages(deletedMessageArray);
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const loggedUser = userData;

  const styles =
    loggedUser?._id !== sender._id
      ? "bg-slate-200 pr-4 rounded-bl-none"
      : "flex-row-reverse bg-blue-100 space-x-4 rounded-br-none";

  const picture = loggedUser?._id === sender._id ? sender.pic : userData?.pic;

  const name = loggedUser?._id === sender._id ? sender.name : userData?.name;

  const isoDate = new Date(createdAt);

  const formattedDate = isoDate.toISOString().split("T")[0];

  const formattedTime = isoDate.toLocaleTimeString("lt-LT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className={`flex  py-4 rounded-xl ${styles} items-center`}>
        <img
          className="mx-4 w-6 h-6 rounded-full"
          src={picture}
          alt="User avatar"
        />
        <h1 className="text-xs shrink-0">{name}</h1>
        {isEditMessage ? (
          <MessageEditFrom
            messageContent={content}
            setIsEditMessage={setIsEditMessage}
            messageId={_id}
          />
        ) : (
          <MessageContent content={content} isDeleted={isDeleted} />
        )}
      </div>
      <h3 className="text-center flex justify-between text-xs items-center">
        {formattedDate}
        {formattedTime}
        <div className="flex">
          {!isDeleted && loggedUser?._id === sender._id && (
            <>
              <div className="group flex relative">
                <button
                  className="text-green-500 mr-4"
                  onClick={() => {
                    setIsEditMessage(true);
                  }}
                >
                  <CiEdit size={24} />
                </button>
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-400 px-1 text-sm text-gray-100 rounded-md absolute 
            -translate-x-2/3 -translate-y-full opacity-0"
                >
                  Edit message
                </span>
              </div>
              <div className="group flex relative">
                <button className="text-red-500" onClick={handleDelete}>
                  <MdDeleteForever size={24} />
                </button>
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-400 px-1 text-sm text-gray-100 rounded-md absolute 
        -translate-x-2/3 -translate-y-full opacity-0"
                >
                  Delete message
                </span>
              </div>
            </>
          )}
        </div>
      </h3>
    </>
  );
};
