import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SocialLink } from "../../components/SocialLink";
import { ChangeEvent, ReactNode } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import Logo1 from "../../assets/Logo.png";
import { SignUpTypes } from "../../App";

export interface Link {
  name: string;
  text: string;
  Icon: ReactNode;
}

const iconsSize = 40;

export const SignIn = ({ setIsSignUp }: SignUpTypes) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("username: " + username + "password: " + password);
    setIsSignUp(true);
    e.preventDefault();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <form
        onSubmit={() => handleSubmit}
        className="w-5/6 h-2/3 bg-slate-200 rounded-lg md:w-[500px] md:h-[600px] flex flex-col items-center justify-center"
      >
        <img
          src={Logo1}
          alt="logo"
          className="w-48 h-48 rounded-lg mb-4 md:mb-8"
        />
        <h1 className="">Sign in to messageMe!</h1>
        <label>
          Username:
          <input
            className="w-64 h-12 mt-1 pl-3 rounded-lg flex items-center justify-center"
            name="username"
            type="text"
            maxLength={20}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="mt-3">
          Password:
          <input
            className="w-64 h-12 mt-1 pl-3 rounded-lg flex items-center justify-center"
            name="password"
            type="password"
            maxLength={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button />
        <div className="flex flex-row mt-3 space-x-2">
          <p>Dont have account?</p>
          <button
            onClick={() => setIsSignUp(false)}
            className="text-cyan-800 hover:underline"
          >
            Sign up
          </button>
        </div>
      </form>
      <div className="flex flex-col mt-6 space-y-6 md:flex-row md:space-y-0 md:space-x-11 ">
        <SocialLink
          name={"Github:"}
          text={"https://github.com/UnisLTU"}
          Icon={<FiGithub size={iconsSize} />}
        />
        <SocialLink
          name={"LinkedIn:"}
          text={"tyla.ugnius@gmail.com"}
          Icon={<FiLinkedin size={iconsSize} />}
        />

        <SocialLink
          name={"E-mail:"}
          text={"tyla.ugnius@gmail.com"}
          Icon={<FiMail size={iconsSize} />}
        />
      </div>
    </div>
  );
};
