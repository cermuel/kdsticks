import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { NAV_LINKS } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { helpers } from "../utils/helpers";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { VscClose } from "react-icons/vsc";
const Navbar = ({
  sideNavOpen,
  setSideNavOpen,
}: {
  sideNavOpen: boolean;
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [showSearch, setShowSearch] = useState(false);
  return (
    <nav className="h-16 bg-black w-full fixed top-0 left-0 z-50 flex items-center justify-between px-5">
      <div className="flex items-center gap-2 h-full">
        <button
          onClick={() => setSideNavOpen(!sideNavOpen)}
          className="cursor-pointer rounded-full md:hidden hover:bg-[#0F0F0F] h-8 w-8 flex items-center justify-center"
        >
          {sideNavOpen ? (
            <IoClose className="text-gray-500 size-5" />
          ) : (
            <RxHamburgerMenu className="text-gray-500 size-4" />
          )}
        </button>
        <h1 className="text-white text-lg md:text-2xl  font-bold">BASHAN</h1>
      </div>
      <div className=" flex items-center gap-6 h-full">
        <ul
          className={`items-center gap-6 h-full ${showSearch ? "opacity-0 max-w-0 overflow-hidden" : "max-w-max opacity-100"} w-full flex max-md:hidden duration-300 transition-all`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = helpers.isActivePath(currentPath, link.url);
            return (
              <button
                className={`${isActive ? "text-white/80 border-b-[#757575]" : "text-[#757575] border-b-transparent hover:border-b-[#757575]"} transition-all duration-300 cursor-pointer h-full text-sm font-light border-b-[1.5px] px-1 border-t-2 border-t-transparent`}
                onClick={() => nav(link.url)}
                key={link.text}
              >
                {link.text}
              </button>
            );
          })}
        </ul>
        <div className="flex items-center h-full gap-4">
          <GoSearch
            onClick={() => setShowSearch(!showSearch)}
            className="text-[#757575] size-5.5 rotate-360 cursor-pointer"
          />
          <div
            className={`${showSearch ? "sm:max-w-[250px] max-w-[150px]" : "max-w-0"} transition-all duration-300 w-full h-full flex items-center overflow-hidden`}
          >
            <input
              type="text"
              placeholder="Search beats"
              className="bg-transparent font-light outline-none text-white/80 placeholder:text-[#757575] transition-all duration-300"
            />
            <VscClose
              onClick={() => setShowSearch(false)}
              className="text-[#757575] size-6 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
