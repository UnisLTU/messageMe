import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import DataContext from "../../../context/DataContext";
import { ModalsEnum } from "../../../pages/Chat";
import ChatBox from "../ChatBox";
import { DataContextProps } from "../../../types/common";

const ChatBoxModal = () => {
  const { setModal } = useContext(DataContext) as DataContextProps;
  return (
    <div className="absolute flex justify-center items-center w-full h-[calc(100%-90px)] bg-[rgba(0,0,0,0.5)] p-4">
      <div className="bg-slate-50 h-full w-[90%] rounded-xl flex flex-col relative items-center p-2 justify-between">
        <div className="absolute top-0 right-0 p-2 cursor-pointer">
          <IoClose onClick={() => setModal(ModalsEnum.NOT_SHOW)} size={32} />
        </div>
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatBoxModal;
