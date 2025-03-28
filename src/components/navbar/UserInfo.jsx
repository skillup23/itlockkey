'use client';

import { ChevronDown } from 'lucide-react';

export default function UserInfo({ user }) {
  return (
    <li
      href="/dashboard"
      className="flex items-center gap-[11px] cursor-pointer"
    >
      <div className="w-5 h-5 flex justify-center items-center bg-gray">
        <h6 className="text-gray-dark">{user.name[0]}</h6>
      </div>
      <h6 className="w-[120px] truncate">{user.name}</h6>
      <ChevronDown className="w-5 text-gray-dark hover:text-black" />
    </li>
  );
}
