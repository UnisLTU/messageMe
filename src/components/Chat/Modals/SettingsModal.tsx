import { IoClose } from "react-icons/io5";
import { ModalsEnum } from "../../../pages/Chat";
import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import { DataContextProps } from "../../../types/common";

const SettingsModal = () => {
  const { setModal } = useContext(DataContext) as DataContextProps;
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.5)]">
      <div className="bg-slate-50 w-[700px] h-1/3 rounded-xl flex flex-col relative items-center p-2 justify-between">
        <h1 className="text-2xl">User settings</h1>
        <div className="absolute top-0 right-0 p-2 cursor-pointer">
          <IoClose onClick={() => setModal(ModalsEnum.NOT_SHOW)} size={32} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SettingsModal;
