import { Link } from "../pages/SignIn/SignIn";

export const SocialLink = ({ name, text, Icon }: Link) => {
  return (
    <a
      href={text}
      className="w-full flex flex-row items-center text-sm md:justify-center md:w-64"
    >
      {Icon}
      <div className="pl-6">
        <h6 className="w-full">{name}</h6>
        <h6>{text}</h6>
      </div>
    </a>
  );
};
