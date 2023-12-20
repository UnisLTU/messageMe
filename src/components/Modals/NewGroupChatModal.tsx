import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import SearchDropDown from "../Chat/SearchDropDown";
import { axiosCreateGroupChat } from "../../API";
import { isAxiosError } from "axios";
import DataContext, {
  DataContextProps,
  UserDataTypes,
} from "../../context/DataContext";
import { ModalsEnum } from "../../pages/Chat";

export interface newChatDataTypes {
  name: string;
  users: string;
}

const NewGroupChatModal = () => {
  const [selectedUser, setSelectedUser] = useState<UserDataTypes | undefined>();
  const [chatName, setChatName] = useState("");
  const [selectedUsersArray, setSelectedUsersArray] = useState<UserDataTypes[]>(
    []
  );

  const { setChats, setSelectedChatId, setModal } = useContext(
    DataContext
  ) as DataContextProps;

  useEffect(() => {
    if (
      selectedUser &&
      !selectedUsersArray.some((user) => user._id === selectedUser._id)
    )
      setSelectedUsersArray((prev) => [...prev, selectedUser]);
  }, [selectedUser]);

  const handleNewChat = async () => {
    const idArray = selectedUsersArray.map((obj) => obj._id);

    const newChatData: newChatDataTypes = {
      name: chatName,
      users: JSON.stringify(idArray),
    };
    try {
      const { data } = await axiosCreateGroupChat(newChatData);
      if (data) {
        setChats((prevChats) => [data, ...prevChats]);
        setSelectedChatId(data._id);
        setModal(ModalsEnum.NOT_SHOW);
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.5)]">
      <div className="bg-slate-50 w-[400px] rounded-xl flex flex-col relative items-center p-2 space-y-4">
        <h1 className="text-2xl">Start New Group Chat</h1>
        <div className="absolute top-0 right-0 p-2 cursor-pointer">
          <IoClose onClick={() => setModal(ModalsEnum.NOT_SHOW)} size={32} />
        </div>
        <label>
          Group chat name
          <input
            required
            className="w-64 h-12 pl-3 rounded-lg flex items-center justify-center"
            type="text"
            maxLength={20}
            onChange={(e) => setChatName(e.target.value)}
          />
        </label>
        <SearchDropDown setSelectedUser={setSelectedUser} />
        {selectedUsersArray &&
          selectedUsersArray.map((user) => (
            <div className="flex space-x-4 items-center">
              <img className="h-8 rounded-full" src={user.pic} alt="" />
              <h1>{user.name}</h1>
            </div>
          ))}
        <button
          onClick={() => handleNewChat()}
          disabled={
            selectedUsersArray.length > 1 || chatName.length > 1 ? false : true
          }
          className="bg-slate-200 disabled:bg-red-100 w-36 rounded-xl text-center p-2 mb-2"
        >
          Start chatting
        </button>
      </div>
    </div>
  );
};

export default NewGroupChatModal;
