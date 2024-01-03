import { UserDataTypes } from "./UserTypes";

export interface LatestMessageTypes {
  content: string;
}

export interface ChatDataTypes {
  _id: string;
  chatName: string;
  createdAt: string;
  isGroupChat: boolean;
  updatedAt: string;
  latestMessage: LatestMessageTypes;
  users: UserDataTypes[];
}
