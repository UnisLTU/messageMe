import { MessageEditTypes } from "../components/Chat/Messages/MessageEditFrom";
import { MessageTypes } from "../types/MessagesTypes";

export const deleteMessage = (
  data: MessageEditTypes,
  messages: MessageTypes[]
) => {
  const indexToRemove = messages.findIndex(
    (obj: MessageEditTypes) => obj._id === data._id
  );
  const newMessages = [...messages];
  if (indexToRemove !== -1) {
    newMessages[indexToRemove] = {
      ...newMessages[indexToRemove],
      isDeleted: true,
      content: "",
    };
  }
  return newMessages;
};

export const editMessage = (
  data: MessageEditTypes,
  messages: MessageTypes[]
) => {
  const indexToEdit = messages.findIndex(
    (obj: MessageEditTypes) => obj._id === data._id
  );
  const newMessages = [...messages];
  if (indexToEdit !== -1) {
    newMessages[indexToEdit] = {
      ...newMessages[indexToEdit],
      content: data.content,
    };
  }
  return newMessages;
};
