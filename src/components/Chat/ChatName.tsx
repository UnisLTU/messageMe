import DataContext from "../../context/DataContext";
import { useContext } from "react";
import { DataContextProps } from "../../types/common";

export const ChatName = () => {
  const { selectedChatUser, isGroupChat, groupChatName } = useContext(
    DataContext
  ) as DataContextProps;

  const { senderName, senderPic } = selectedChatUser;

  return (
    <div className="md:bg-slate-200 bg-slate-50 rounded-xl h-24 w-full flex flex-row items-center">
      <img
        className="bg-red-400 w-10 h-10 rounded-full mx-4"
        src={isGroupChat ? "" : senderPic}
        alt=""
      />
      <h1 className=" font-semibold text-xl">
        {isGroupChat ? groupChatName : senderName}
      </h1>
    </div>
  );
};
