import { Dispatch, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import SearchDropDown from "../Chat/SearchDropDown";
import { axiosCreateOrAccess } from "../../API";
import { isAxiosError } from "axios";
import { ChatDataTypes, UserDataTypes } from "../../context/DataContext";
import { ModalsEnum } from "../Chat/ChatDesktop";

interface PersonalModalProps {
  createNewPersonalChat: (data: ChatDataTypes) => void;
  setModal: Dispatch<SetStateAction<ModalsEnum>>;
}

export interface UserIdTypes {
  userId: string | undefined;
}

const NewPersonalChatModal = ({
  createNewPersonalChat,
  setModal,
}: PersonalModalProps) => {
  const [selectedUser, setSelectedUser] = useState<UserDataTypes | undefined>();

  const userId: UserIdTypes = { userId: selectedUser?._id };

  const handleNewChat = async () => {
    try {
      const { data } = await axiosCreateOrAccess(userId);
      if (data) {
        createNewPersonalChat(data);
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.5)]">
      <div className="bg-slate-50 w-[400px] h-1/3 rounded-xl flex flex-col relative items-center p-2 justify-between">
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
          className="bg-slate-200 disabled:bg-red-100 w-36 rounded-xl text-center p-2 mb-2"
        >
          Start chatting
        </button>
      </div>
    </div>
  );
};

export default NewPersonalChatModal;
