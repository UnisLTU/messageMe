import { ChatDataTypes } from "./ChatTypes";
import { UserDataTypes } from "./UserTypes";

export interface MessageTypes {
  chat: ChatDataTypes;
  content: string;
  createdAt: string;
  sender: UserDataTypes;
  isDeleted: boolean;
  _id: string;
}
