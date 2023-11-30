import { LuSend } from "react-icons/lu";
import { SlPlus } from "react-icons/sl";
import { ChatBanner } from "./ChatBanner";
import { ChatName } from "./ChatName";
import { Navigation } from "./Navigation";

const ChatDesktop = () => {
  return (
    <div className="flex flex-col max-w-[1920px] w-full bg-slate-400 h-screen p-10">
      <div className="max-w-full shadow-md bg-slate-200 rounded-xl p-8 flex flex-row space-x-4 max-h-full min-h-full">
        <Navigation />
        <div className="w-full space-y-4 h-full flex flex-col">
          <div className="flex flex-row space-x-4">
            <form className="h-18 w-1/2">
              <input
                placeholder="Search for chat..."
                type="text"
                onChange={() => {}}
                className="bg-slate-50 p-4 rounded-xl w-full"
              />
            </form>
            <ChatName />
          </div>
          <div className="w-full h-full overflow-hidden space-x-4 flex flex-row">
            <div className="w-1/2">
              <div className="h-1/2 w-full pb-14">
                <div className="w-full pb-4 flex flex-row justify-between">
                  <div>Personal messages:</div>
                  <button className="flex flex-row space-x-2" type="button">
                    <h1>Start new chat</h1>
                    <SlPlus size={24} />
                  </button>
                </div>
                <div className="h-full w-full overflow-y-scroll no-scrollbar space-y-4">
                  <ChatBanner name={"Ugnius Tyla"} />
                </div>
              </div>
              <div className="h-1/2 w-full">
                <div className="w-full pb-4 flex flex-row justify-between">
                  <div>Group chats:</div>
                  <button className="flex flex-row space-x-2" type="button">
                    <h1>Start new group chat</h1>
                    <SlPlus size={24} />
                  </button>
                </div>
                <div className="h-full w-full overflow-y-scroll no-scrollbar space-y-4">
                  <ChatBanner name={"VCS2023"} />
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-slate-50 rounded-xl flex flex-col p-8">
              <div className="h-full"></div>
              <div className="bg-slate-200 w-full h-24 flex flow-row rounded-xl overflow-hidden">
                <form className="w-5/6 h-20 ">
                  <input
                    placeholder="Your message..."
                    type="text"
                    onChange={() => {}}
                    className="px-4 bg-slate-200 w-full h-full  focus:outline-none"
                  />
                </form>
                <button
                  type="button"
                  className="w-1/6 flex justify-center items-center"
                >
                  <LuSend size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDesktop;
