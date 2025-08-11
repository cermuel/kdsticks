import { NAV_LINKS } from "../constants";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineMail, AiOutlineSpotify } from "react-icons/ai";
import { SiBeatstars } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-black flex items-start justify-between p-5 md:p-20 xl:px-56 flex-wrap">
      <h1 className="text-4xl font-bold text-white/60">KDSTICKS</h1>
      <div className="max-md:w-full max-md:space-y-4 md:flex md:flex-1 md:justify-between border-white">
        <div className="max-md:hidden"></div>
        <ul className="flex flex-col">
          {NAV_LINKS.map((link, index: number) => (
            <li
              className="hover:underline text-white/60 hover:text-white transition-all duration-300 text-sm my-1 cursor-pointer"
              key={index}
            >
              {link.text}
            </li>
          ))}
        </ul>
        <ul className="flex gap-4">
          <li>
            <a
              href="https://instagram.com/kd_sticks/"
              target="_blank"
              className="text-white/60 hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
          </li>
          <li>
            <a
              href="mailto:egbebiolamide@gmail.com "
              target="_blank"
              className="text-white/60 hover:text-white"
            >
              <AiOutlineMail size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/kd_sticks/"
              target="_blank"
              className="text-white/60 hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://spotify.com/kd_sticks/"
              target="_blank"
              className="text-white/60 hover:text-white"
            >
              <AiOutlineSpotify size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://www.beatstars.com/kdsticks/tracks?_rt=p"
              target="_blank"
              className="text-white/60 hover:text-white"
            >
              <SiBeatstars size={18} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
