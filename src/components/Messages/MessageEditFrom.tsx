import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { isAxiosError } from "axios";
import { axiosEditMessage } from "../../API";
import { socket } from "../Chat/ChatListItem";
import { editMessage } from "../../utils/messageFunc";
import DataContext from "../../context/DataContext";
import { DataContextProps } from "../../types/common";

interface MessageEditFormProps {
  messageContent: string;
  setIsEditMessage: Dispatch<SetStateAction<boolean>>;
  messageId: string;
}

export interface MessageEditTypes {
  content: string;
  _id: string;
}

const MessageEditFrom = ({
  messageContent,
  setIsEditMessage,
  messageId,
}: MessageEditFormProps) => {
  const { setMessages, messages } = useContext(DataContext) as DataContextProps;
  const [editedMessage, setEditedMessage] = useState("");

  const editMessageHandle = async () => {
    try {
      //send to backend
      const { data } = await axiosEditMessage({
        _id: messageId,
        content: editedMessage,
      });
      //emit to other users
      socket.emit("editMessage", { data });
      //update frontend
      const deletedMessageArray = editMessage(data, messages);
      setMessages(deletedMessageArray);
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err);
      }
    } finally {
      setIsEditMessage(false);
    }
  };

  return (
    <>
      <form className="w-full">
        <input
          placeholder={messageContent}
          type="text"
          onChange={(e) => {
            setEditedMessage(e.target.value);
          }}
          className="px-4 bg-slate-200 w-full h-full  focus:outline-none"
        />
      </form>
      <button
        type="button"
        onClick={() => {
          editMessageHandle();
        }}
        className="flex justify-center text-green-400 items-center"
      >
        <FaCheck size={16} />
      </button>
      <button
        type="button"
        onClick={() => {
          setIsEditMessage(false);
        }}
        className="flex justify-center text-red-400 items-center"
      >
        <MdOutlineCancel size={16} />
      </button>
    </>
  );
};

export default MessageEditFrom;
