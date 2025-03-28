'use client';

import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';

function LeftNavbar({ children }) {
  const [isHiddenNav, setIsHiddenNav] = useState(true);

  return (
    <nav
      className={`fixed top-0 left-0 bottom-0 w-[240px] py-[10px] px-4 bg-gray-light drop-shadow-sm ${
        isHiddenNav ? `` : `left-[-200px]`
      }`}
    >
      <ChevronsLeft
        className="absolute top-[10px] right-[10px] w-5 text-gray-dark hover:text-black cursor-pointer"
        onClick={() => setIsHiddenNav(!isHiddenNav)}
      />
      {children}
    </nav>
  );
}

export default LeftNavbar;
