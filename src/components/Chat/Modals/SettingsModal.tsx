import { IoClose } from "react-icons/io5";
import { ModalsEnum } from "../../../pages/Chat";
import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import { DataContextProps } from "../../../types/common";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import ImageUpload from "../ImageUpload";

const SettingsModal = () => {
  const { setModal, setIsDarkMode, isDarkMode } = useContext(
    DataContext
  ) as DataContextProps;

  const handleClick = () => {
    localStorage.theme === "dark"
      ? (localStorage.theme = "light")
      : (localStorage.theme = "dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.5)] dark:text-white">
      <div className="bg-slate-50 dark:bg-gray-900 w-[700px] h-1/3 rounded-xl flex flex-col relative items-center p-2">
        <div className="absolute top-0 right-0 p-2 cursor-pointer">
          <IoClose onClick={() => setModal(ModalsEnum.NOT_SHOW)} size={32} />
        </div>
        <h1 className="text-2xl">User settings</h1>
        <div className="flex w-full p-4 space-x-4">
          <ImageUpload />
          <div className="flex w-1/2 justify-center items-center">
            <div className="flex justify-center items-center w-full">
              <h1 className="pr-4">Dark mode:</h1>
              <button className="flex" onClick={handleClick}>
                {isDarkMode ? (
                  <MdDarkMode size={32} />
                ) : (
                  <MdLightMode size={32} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
