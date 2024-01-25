import axios from "axios";
import { ChangeAvatarData, UserDataTypes } from "./types/UserTypes";
import { UserIdTypes } from "./components/Chat/Modals/NewPersonalChatModal";
import { MessageToSendTypes } from "./components/Chat/Messages/MessageSendContainer";
import { newChatDataTypes } from "./components/Chat/Modals/NewGroupChatModal";
import { MessageEditTypes } from "./components/Chat/Messages/MessageEditFrom";
import { ChatDataTypes } from "./types/ChatTypes";
import { RenameGroupTypes } from "./components/Chat/Modals/GroupChatSettingsModal";

const api = axios.create({
  withCredentials: true,
  baseURL: "https://mmb-cr6t.onrender.com/api", //API base URL
});

// Request interceptor for adding the bearer token
api.interceptors.request.use((config) => {
  //taking userData from local storage
  const storageUser = localStorage.getItem("userData");

  if (storageUser) {
    const parsedStorageUser = JSON.parse(storageUser);
    const token = parsedStorageUser.token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//register user
export const axiosSignUp = (data: UserDataTypes) => {
  return api.post("/user/register", { ...data });
};

//login
export const axiosSignIn = (data: UserDataTypes) => {
  return api.post("/user/login", { ...data });
};

//search user in DB by query
export const axiosSearchUser = (searchQuery: string) => {
  return api.get("/user", {
    params: {
      search: searchQuery,
    },
  });
};

//upload image to cloudinary
export const axiosUploadImage = (selectedImage: File) => {
  const formData = new FormData();
  formData.append("file", selectedImage);
  formData.append("upload_preset", "auto-tag");

  return axios.post(
    "https://api.cloudinary.com/v1_1/dl61rkve1/image/upload",
    formData
  );
};

//update users avatar with url from cloudinary
export const axiosChangeAvatar = (data: ChangeAvatarData) => {
  return api.put("/user/changeavatar", { data });
};

// remove user from group chat
export const axiosRemoveUser = (data: ChatDataTypes) => {
  return api.put("/chat/groupremove", { ...data });
};

// add user to group chat
export const axiosAddUser = (data: ChatDataTypes) => {
  return api.put("/chat/addtogroup", { ...data });
};

//fetch all chats from DB
export const axiosFetchChats = () => {
  return api.get("/chat");
};

//send new message
export const axiosCreateOrAccess = (data: UserIdTypes) => {
  return api.post("/chat", { ...data });
};

//create new group
export const axiosCreateGroupChat = (data: newChatDataTypes) => {
  return api.post("/chat/creategroup", { ...data });
};

//change chat name
export const axiosChangeGroupChatName = (data: RenameGroupTypes) => {
  return api.put("/chat/renamegroup", { ...data });
};

//get chat with id? messages
export const axiosAllMessages = (selectedChat: string) => {
  return api.get(`/message/${selectedChat}`);
};

//send new message to chat with id
export const axiosSendMessage = (data: MessageToSendTypes) => {
  return api.post("/message", { ...data });
};

//remove message by id
export const axiosRemoveMessage = (_id: string) => {
  return api.put("/message/remove", { _id });
};

//remove message by id
export const axiosEditMessage = (data: MessageEditTypes) => {
  return api.put("/message/edit", { ...data });
};

export default api;
