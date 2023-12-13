import { SendersInfoTypes } from "../components/Chat/ChatListItem";
import { ChatDataTypes, UserDataTypes } from "../context/DataContext";

export const SendersInfo = (
  userData: UserDataTypes | undefined,
  chat: ChatDataTypes
): SendersInfoTypes => {
  const loggedUser = userData;
  const users = chat.users;

  const senderName =
    users[0]._id === loggedUser?._id ? users[1].name : users[0].name;

  const senderPic =
    users[0]._id === loggedUser?._id ? users[1].pic : users[0].pic;

  const sendersInfo = { senderPic, senderName };

  return sendersInfo;
};
