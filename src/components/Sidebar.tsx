import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { Dispatch } from "react";

const Sidebar = ({
  sideNavOpen,
  hideNav,
}: {
  sideNavOpen: boolean;
  hideNav: Dispatch<boolean>;
}) => {
  const nav = useNavigate();
  return (
    <div
      className={`${sideNavOpen ? "left-0" : "-left-full"} transition-all duration-300 fixed h-[calc(100vh-4rem)] top-16 bg-black z-20 flex flex-col w-72`}
    >
      <ul className="flex flex-col gap-2 p-4">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <li
              key={link.text}
              onClick={() => {
                nav(link.url);
                hideNav(false);
              }}
              className="flex py-4 items-center justify-start gap-4 px-2 cursor-pointer"
            >
              <Icon className="size-4 text-[#757575]" />
              <span className="text-[#757575] text-sm"> {link.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
