import {
  IoHomeOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlPlus } from "react-icons/sl";
import { Link } from "react-router-dom";
import { ChatBanner } from "./ChatBanner";

export interface ChatBannerProps {
  name: string;
}

const ChatMobile = () => {
  return (
    <div className="flex flex-col w-full max-w-[1920px] h-full bg-cover bg-slate-400">
      <div className="text-center text-xl">MessageMe</div>
      <div className="m-4 mt-2 lg:m-10 max-w-full shadow-md bg-slate-200 rounded-xl p-4 flex flex-col space-y-2 h-[85%]">
        <form>
          <input
            placeholder="Search for chat..."
            type="text"
            onChange={() => {}}
            className="bg-slate-50 shadow-md w-full rounded-xl p-2 h-1/8"
          />
        </form>
        <div className="flex flex-row justify-between px-4 items-center">
          <div>Personal chats</div>
          <button type="button">
            <SlPlus size={20} />
          </button>
        </div>
        <div className="space-y-4 overflow-scroll h-1/2">
          <ChatBanner name={"Ugnius Tyla"} />
        </div>
        <div className="flex flex-row justify-between px-4 items-center">
          <h1>Group chats</h1>
          <button type="button">
            <SlPlus size={20} />
          </button>
        </div>
        <div className="space-y-4 overflow-scroll h-1/2">
          <ChatBanner name={"VCS2023"} />
        </div>
      </div>
      <nav className="w-full  bg-slate-200 flex-1 flex flex-row justify-around items-center">
        <Link className="w-1/3 h-full justify-center flex items-center" to="#">
          <IoSettingsOutline size={24} />
        </Link>
        <Link
          className="w-1/3 h-full justify-center flex items-center"
          to="/chat"
        >
          <IoHomeOutline size={28} />
        </Link>
        <Link className="w-1/3 h-full justify-center flex items-center" to="/">
          <IoLogOutOutline size={24} />
        </Link>
      </nav>
    </div>
  );
};

export default ChatMobile;
