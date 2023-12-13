import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext, { DataContextProps } from "../../../context/DataContext";
import { Dispatch, SetStateAction } from "react";
import { ModalsEnum } from "../../../pages/Chat";

interface NavigationProps {
  setModal: Dispatch<SetStateAction<ModalsEnum>>;
}

export const Navigation = ({ setModal }: NavigationProps) => {
  const { userData } = useContext(DataContext) as DataContextProps;

  return (
    <div className="md:w-[10%] md:rounded-xl md:h-full md:flex-col w-full min-h-fit bg-slate-50 flex flex-row text-center items-center justify-around">
      <div className="md:flex flex-col hidden items-center space-y-2">
        <img
          className="bg-slate-800 h-20 w-20 rounded-full border-blue-400 border-4"
          src={userData?.pic}
          alt=""
        />
        <h1 className="font-bold text-xl break-words">{userData?.name}</h1>
      </div>
      <div
        className="h-24 w-24   flex flex-col items-center justify-center"
        onClick={() => setModal(ModalsEnum.SETTINGS)}
      >
        <IoSettingsOutline size={32} />
        <h2 className="text-md hidden md:flex break-words p-2">
          User settings
        </h2>
      </div>
      <Link
        //with click clearing localstorage and navigating to "/"
        onClick={() => localStorage.clear()}
        className="h-24 w-24 flex flex-col items-center justify-center"
        to={"/"}
      >
        <IoLogOutOutline size={32} />
        <h2 className="hidden md:flex text-md">Logout</h2>
      </Link>
    </div>
  );
};
