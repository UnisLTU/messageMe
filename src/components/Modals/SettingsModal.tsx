import React, { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { ModalsEnum } from "../Chat/ChatDesktop";

interface SettingsModalProps {
  setModal: Dispatch<SetStateAction<ModalsEnum>>;
}

const SettingsModal = ({ setModal }: SettingsModalProps) => {
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.5)]">
      <div className="bg-slate-50 w-[400px] h-1/3 rounded-xl flex flex-col relative items-center p-2 justify-between">
        <h1 className="text-2xl">User settings</h1>
        <div className="absolute top-0 right-0 p-2 cursor-pointer">
          <IoClose onClick={() => setModal(ModalsEnum.NOT_SHOW)} size={32} />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
