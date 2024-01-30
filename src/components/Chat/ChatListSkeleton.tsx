import React from "react";

const ChatListSkeleton = () => {
  return (
    <div className="rounded-xl h-16 shadow-md flex items-center flex-row space-x-4 dark:bg-gray-900">
      <div className="w-6 h-6 bg-gray-400 rounded-full ml-4 animate-pulse" />
      <h1 className="animate-pulse w-96 h-6 bg-gray-400 rounded-lg"></h1>
    </div>
  );
};

export default ChatListSkeleton;
