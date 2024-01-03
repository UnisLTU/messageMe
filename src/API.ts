import axios from "axios";
import { UserDataTypes } from "./types/UserTypes";
import { UserIdTypes } from "./components/Chat/Modals/NewPersonalChatModal";
import { MessageToSendTypes } from "./components/Chat/Messages/MessageSendContainer";
import { newChatDataTypes } from "./components/Chat/Modals/NewGroupChatModal";
import { MessageEditTypes } from "./components/Chat/Messages/MessageEditFrom";

const api = axios.create({
  baseURL: "http://localhost:4000/api/", //API base URL
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
