import axios from "axios";
import { UserDataTypes } from "./context/DataContext";
import { MessageToSendTypes } from "./components/Messages/MessageSendContainer";
import { UserIdTypes } from "./components/Modals/NewPersonalChatModal";
import { newChatDataTypes } from "./components/Modals/NewGroupChatModal";

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

//send new messagae
export const axiosCreateOrAccess = (data: UserIdTypes) => {
  return api.post("/chat", { ...data });
};

//send new messagae
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

export default api;
