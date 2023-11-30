import { ChatBannerProps } from "./ChatMobile";

export const ChatBanner = ({ name }: ChatBannerProps) => {
  const message =
    " Jet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigauJet kam nesigau";
  return (
    <div className="bg-slate-50 rounded-xl h-16 lg:h-12 shadow-md flex items-center flex-row space-x-4">
      <img className="bg-red-400 w-6 h-6 rounded-full ml-4" src="" alt="" />
      <h1 className="">{name}</h1>
      <p className="lg:w-96 w-48 text-sm truncate">Last message: {message}</p>
    </div>
  );
};
