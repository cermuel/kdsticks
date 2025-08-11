import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomPlayer from "./BottomPlayer";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  return (
    <main className="w-screen h-dvh overflow-x-hidden overscroll-y-scroll pt-20 bg-[#121212]">
      <Navbar sideNavOpen={showSidebar} setSideNavOpen={setshowSidebar} />
      <Sidebar sideNavOpen={showSidebar} hideNav={setshowSidebar} />
      <div className="w-full h-max">{children}</div>
      <Footer />
      <BottomPlayer />
    </main>
  );
};

export default Layout;
