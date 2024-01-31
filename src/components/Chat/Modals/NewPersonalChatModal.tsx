import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import SearchDropDown from "../SearchDropDown";
import { axiosCreateOrAccess } from "../../../API";
import { isAxiosError } from "axios";
import DataContext from "../../../context/DataContext";
import { ModalsEnum } from "../../../pages/Chat";
import { SendersInfo } from "../../../utils/SendersInfo";
import { UserDataTypes } from "../../../types/UserTypes";
import { DataContextProps } from "../../../types/common";

export interface UserIdTypes {
  userId: string | undefined;
}

const NewPersonalChatModal = () => {
  const [selectedUser, setSelectedUser] = useState<UserDataTypes | undefined>();

  const {
    chats,
    setChats,
    userData,
    setSelectedChatUser,
    setSelectedChatId,
    setModal,
  } = useContext(DataContext) as DataContextProps;

  const userId: UserIdTypes = { userId: selectedUser?._id };

  const handleNewChat = async () => {
    try {
      const { data } = await axiosCreateOrAccess(userId);

      if (data) {
        const doesChatExist = chats.some((item) => item._id === data._id);
        const sender = SendersInfo(userData, data);
        console.log(sender);

        if (!doesChatExist) {
          setSelectedChatUser(sender);
          setChats((prevChats) => [data, ...prevChats]);
        } else setSelectedChatUser(sender);

        setSelectedChatId(data._id);
      }
    } catch (err) {
      if (isAxiosError(err)) console.log(err);
    } finally {
      setModal(ModalsEnum.NOT_SHOW);
    }
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.5)] dark:text-white">
      <div className="bg-slate-50 dark:bg-gray-900 w-[400px] h-1/3 rounded-xl flex flex-col relative items-center p-2 justify-between">
        <h1 className="text-2xl">Start New Chat with person</h1>
        <div className="absolute top-0 right-0 p-2 cursor-pointer">
          <IoClose onClick={() => setModal(ModalsEnum.NOT_SHOW)} size={32} />
        </div>
        {!selectedUser && <SearchDropDown setSelectedUser={setSelectedUser} />}
        {selectedUser && (
          <div className="flex space-x-4 items-center">
            <img className="h-8 rounded-full" src={selectedUser.pic} alt="" />
            <h1>{selectedUser.name}</h1>
          </div>
        )}
        <button
          onClick={() => handleNewChat()}
          disabled={!selectedUser}
          className="bg-slate-200 disabled:bg-red-100 dark:bg-gray-950 dark:disabled:bg-gray-400 w-36 rounded-xl text-center p-2 mb-2"
        >
          Start chatting
        </button>
      </div>
    </div>
  );
};

export default NewPersonalChatModal;
