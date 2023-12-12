import { useContext } from "react";
import DataContext, {
  DataContextProps,
  UserDataTypes,
} from "../../context/DataContext";

interface MessageProps {
  message: {
    content: string;
    createdAt: string;
    sender: UserDataTypes;
  };
}

export const Message = ({ message }: MessageProps) => {
  const { content, createdAt, sender } = message;
  const { userData } = useContext(DataContext) as DataContextProps;

  const loggedUser = userData;

  const styles =
    loggedUser?._id !== sender._id
      ? "bg-slate-200 pr-4"
      : "flex-row-reverse bg-blue-100 space-x-4";

  const picture = loggedUser?._id === sender._id ? sender.pic : userData?.pic;

  const name = loggedUser?._id === sender._id ? sender.name : userData?.name;

  const isoDate = new Date(createdAt);

  const formattedDate = isoDate.toISOString().split("T")[0];

  const formattedTime = isoDate.toLocaleTimeString("lt-LT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className={`flex ${styles} py-4 rounded-xl items-center`}>
        <img
          className="mx-4 w-6 h-6 rounded-full"
          src={picture}
          alt="User avatar"
        />
        <h1 className="text-xs shrink-0">{name}</h1>
        <p className="pl-4">{content}</p>
      </div>
      <h3 className="text-center text-xs">
        {formattedDate}
        {formattedTime}
      </h3>
    </>
  );
};
