import DataContext from "../../context/DataContext";
import { useContext } from "react";
import { DataContextProps } from "../../types/common";
import { CiSettings } from "react-icons/ci";
import { ModalsEnum } from "../../pages/Chat";

export const ChatName = () => {
  const {
    selectedChatUser,
    isGroupChat,
    groupChatName,
    setModal,
    userData,
    groupAdminId,
  } = useContext(DataContext) as DataContextProps;

  const { senderName, senderPic } = selectedChatUser;

  return (
    <div className="md:bg-slate-200 bg-slate-50 rounded-xl h-24 w-full flex flex-row justify-between items-center">
      <div className="flex items-center">
        <img
          className="bg-red-400 w-10 h-10 rounded-full mx-4"
          src={isGroupChat ? "" : senderPic}
          alt=""
        />
        <h1 className="font-semibold text-xl">
          {isGroupChat ? groupChatName : senderName}
        </h1>
      </div>
      {userData?._id === groupAdminId ? (
        <button
          className="mr-4"
          onClick={() => setModal(ModalsEnum.GROUP_CHAT_SETTINGS)}
        >
          <CiSettings size={32} />
        </button>
      ) : null}
    </div>
  );
};
