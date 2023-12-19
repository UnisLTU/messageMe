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
      text: "linkedin.com/in/ugnius-tyla-9083a1132",
      icon: <FiLinkedin size={40} />,
    },
    {
      name: "E-mail:",
      text: "tyla.ugnius@gmail.com",
      icon: <FiMail size={40} />,
    },
  ];
  return (
    <div className="flex flex-col mt-6 space-y-6  md:flex-row md:space-y-0 md:space-x-11 ">
      {socialLinks.map(({ name, text, icon }, i) => {
        return <SocialLink key={i} name={name} text={text} Icon={icon} />;
      })}
    </div>
  );
};

export default SocialLinks;
