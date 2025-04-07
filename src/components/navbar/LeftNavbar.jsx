"use client";

import { ChevronsLeft } from "lucide-react";
import { useState } from "react";

function LeftNavbar({ children }) {
  const [isHiddenNav, setIsHiddenNav] = useState(true);

  function handdleNav() {
    setIsHiddenNav(!isHiddenNav);

    if (isHiddenNav) {
      if (typeof window !== "undefined") {
        let headerElement = document.querySelector(".show-navbar");
        let mainElement = document.querySelector(".show-navbar_main");
        headerElement.className = "hidden-navbar";
        mainElement.className = "hidden-navbar_main";
      }
    } else {
      if (typeof window !== "undefined") {
        let headerElement = document.querySelector(".hidden-navbar");
        let mainElement = document.querySelector(".hidden-navbar_main");
        headerElement.className = "show-navbar";
        mainElement.className = "show-navbar_main";
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 bottom-0 w-[240px] py-[10px] px-4 bg-gray-light drop-shadow-sm ${
        isHiddenNav ? `` : `left-[-200px]`
      }`}
    >
      <ChevronsLeft
        className={`absolute top-[10px] right-[10px] w-5 text-gray-dark hover:text-black cursor-pointer ${
          isHiddenNav ? `` : `rotate-180`
        }`}
        onClick={() => handdleNav()}
      />
      {children}
    </nav>
  );
}

export default LeftNavbar;
