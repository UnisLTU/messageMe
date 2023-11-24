import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SocialLink } from "./SocialLink";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: "Github:",
      text: "https://github.com/UnisLTU",
      icon: <FiGithub size={40} />,
    },
    {
      name: "LinkedIn:",
      text: "https://github.com/UnisLTU",
      icon: <FiLinkedin size={40} />,
    },
    {
      name: "E-mail:",
      text: "tyla.ugnius@gmail.com",
      icon: <FiMail size={40} />,
    },
  ];
  return (
    <div className="flex flex-col mt-6 space-y-6  lg:flex-row lg:space-y-0 lg:space-x-11 ">
      {socialLinks.map(({ name, text, icon }, i) => {
        return <SocialLink key={i} name={name} text={text} Icon={icon} />;
      })}
    </div>
  );
};

export default SocialLinks;
