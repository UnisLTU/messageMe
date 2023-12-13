import DataContext, { DataContextProps } from "../../context/DataContext";
import { useContext } from "react";

export const ChatName = () => {
  const { selectedChat } = useContext(DataContext) as DataContextProps;

  const { senderName, senderPic } = selectedChat;

  return (
    <div className="bg-slate-200 rounded-xl h-24 w-full flex flex-row items-center">
      <img
        className="bg-red-400 w-10 h-10 rounded-full mx-4"
        src={senderPic}
        alt=""
      />
      <h1 className=" font-semibold text-xl">{senderName}</h1>
    </div>
  );
};
