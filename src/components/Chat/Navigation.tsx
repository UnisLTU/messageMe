import {
  IoHomeOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const links = [
  {
    name: "Settings",
    to: "#",
    icon: <IoSettingsOutline size={32} />,
  },
  {
    name: "Home",
    to: "/chat",
    icon: <IoHomeOutline size={32} />,
  },
  {
    name: "Logout",
    to: "/",
    icon: <IoLogOutOutline size={32} />,
  },
];

export const Navigation = () => {
  return (
    <div className="w-[10%] bg-slate-50 rounded-xl h-full flex flex-col text-center items-center justify-around">
      <div className="flex flex-col items-center space-y-2">
        <img
          className="bg-slate-800 h-20 w-20 rounded-full border-blue-400 border-4"
          src=""
          alt=""
        />
        <h1 className="font-bold text-xl break-words">
          {/*name surname*/}Ugnius Tyla
        </h1>
        <h2 className="text-md break-words">{/*name surname*/}UnisLTU</h2>
      </div>
      {links.map(({ name, to, icon }) => {
        return (
          <Link
            className="h-24 w-24  flex flex-col items-center justify-center"
            to={to}
          >
            {icon}
            <h2 className="text-md">{name}</h2>
          </Link>
        );
      })}
    </div>
  );
};
