import { IoClose } from "react-icons/io5";
import { ModalsEnum } from "../../../pages/Chat";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import { DataContextProps } from "../../../types/common";
import SearchDropDown from "../SearchDropDown";
import { UserDataTypes } from "../../../types/UserTypes";
import { AxiosResponse, isAxiosError } from "axios";
import {
  axiosAddUser,
  axiosChangeGroupChatName,
  axiosRemoveUser,
} from "../../../API";

export interface RenameGroupTypes {
  chatId: string;
  chatName: string;
}

export const GroupChatSettingsModal = () => {
  const {
    setModal,
    chatUsers,
    setChatUsers,
    userData,
    groupAdminId,
    selectedChatId,
    setChats,
    setGroupChatName,
  } = useContext(DataContext) as DataContextProps;

  const [selectedUser, setSelectedUser] = useState<UserDataTypes | undefined>();
  const [newName, setNewName] = useState("");

  const handleUserAction = async (
    userActionId: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axiosFunction: (data: any) => Promise<AxiosResponse<any, any>>
  ) => {
    if (userData?._id !== groupAdminId) return;

    try {
      const dataToSend = {
        chatId: selectedChatId,
        user: userActionId,
      };

      const { data } = await axiosFunction(dataToSend);

      setChatUsers(data.users);
      setChats((prevChats) => {
        const chatIndex = prevChats.findIndex(
          (chat) => chat._id === selectedChatId
        );
        if (chatIndex !== -1) {
          const newChats = [...prevChats];
          newChats[chatIndex] = data;
          return newChats;
        }
        return prevChats;
      });
    } catch (err) {
      if (isAxiosError(err)) console.log(err);
    }
  };

  const removeUser = async (userRemoveId: string | undefined) => {
    await handleUserAction(userRemoveId, axiosRemoveUser);
  };

  const userToAdd = async (userToAddId: string) => {
    await handleUserAction(userToAddId, axiosAddUser);
  };

  const handleChatNameChange = async () => {
    try {
      const dataToSend = {
        chatId: selectedChatId,
        chatName: newName,
      };

      const { data } = await axiosChangeGroupChatName(dataToSend);
      setGroupChatName(data.chatName);

      setChats((prevChats) => {
        const chatIndex = prevChats.findIndex((chat) => chat._id === data._id);
        if (chatIndex !== -1) {
          const newChats = [...prevChats];
          newChats[chatIndex] = data;
          return newChats;
        }
        return prevChats;
      });
    } catch (err) {
      if (isAxiosError(err)) console.log(err);
    } finally {
      setNewName("");
    }
  };

  useEffect(() => {
    if (
      selectedUser?._id &&
      !chatUsers.some(
        (user) =>
          user._id === selectedUser._id && userData?._id !== groupAdminId
      )
    )
      userToAdd(selectedUser._id);
  }, [selectedUser]);

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.5)] dark:text-white">
      <div className="bg-slate-50 dark:bg-gray-900 w-[700px] h-fit rounded-xl flex flex-col relative items-center p-2">
        <h1 className="text-2xl">Chat settings</h1>
        <div className="absolute top-0 right-0 p-2 cursor-pointer">
          <IoClose onClick={() => setModal(ModalsEnum.NOT_SHOW)} size={32} />
        </div>
        <div className="flex flex-col md:flex-row h-fit w-full">
          <div className="w-full md:w-1/2 h-fit px-4 flex flex-col">
            <h1 className="p-2 text-sm">Change chat name:</h1>
            <input
              className="bg-slate-50 p-4 rounded-xl w-full dark:bg-gray-950"
              placeholder="New chat name"
              value={newName}
              type="text"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleChatNameChange}
                className="bg-red-200 dark:bg-gray-950 rounded-lg p-2 mt-4"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setNewName("")}
                className="bg-red-200 dark:bg-gray-950 rounded-lg p-2 mt-4"
              >
                Decline
              </button>
            </div>

            <h1 className="p-2 text-sm">Add new user:</h1>
            <SearchDropDown setSelectedUser={setSelectedUser} />
          </div>
          <div className="w-full md:w-1/2 px-4 mt-4">
            <h1 className="p-2 text-sm">Remove user from group chat:</h1>
            <div className="flex flex-col overflow-y-scroll no-scrollbar space-y-2 h-4/5">
              {chatUsers.map((chatUser) => (
                <div
                  key={chatUser._id}
                  className="w-full flex space-x-4 justify-between"
                >
                  <h1>{chatUser.name}</h1>
                  <button
                    disabled={chatUser._id === groupAdminId}
                    type="button"
                    onClick={() => removeUser(chatUser._id)}
                    className={`rounded-lg p-1 ${
                      chatUser._id === groupAdminId
                        ? "bg-slate-200 dark:bg-gray-400"
                        : "bg-red-200 dark:bg-gray-950"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
