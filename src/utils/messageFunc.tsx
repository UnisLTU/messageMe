export const deleteMessage = (data, messages) => {
  const indexToRemove = messages.findIndex((obj) => obj._id === data._id);
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

export const editMessage = (data, messages) => {
  const indexToEdit = messages.findIndex((obj) => obj._id === data._id);
  const newMessages = [...messages];
  if (indexToEdit !== -1) {
    newMessages[indexToEdit] = {
      ...newMessages[indexToEdit],
      content: data.content,
    };
  }
  return newMessages;
};
