import React from "react";

const ChatNameSkeleton = () => {
  return (
    <div className="md:bg-slate-200 md:dark:bg-gray-900 bg-slate-50 dark:bg-gray-900 rounded-xl h-24 w-full flex flex-row justify-between items-center">
      <div className="flex items-center">
        <img className="bg-slate-400 animate-pulse w-10 h-10 rounded-full mx-4 object-cover" />
        <h1 className="font-semibold text-xl bg-slate-400 w-64 h-6 rounded-lg animate-pulse"></h1>
      </div>
    </div>
  );
};

export default ChatNameSkeleton;
