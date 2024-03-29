import { ReactNode } from "react";

export interface LinkTypes {
  name: string;
  text: string;
  Icon: ReactNode;
}

export const SocialLink = ({ name, text, Icon }: LinkTypes) => {
  return (
    <a
      href={text}
      className="w-full flex flex-row items-center text-sm md:justify-center md:w-64 dark:text-white"
    >
      {Icon}
      <div className="pl-6 ">
        <h6 className="w-full">{name}</h6>
        <h6>{text}</h6>
      </div>
    </a>
  );
};
