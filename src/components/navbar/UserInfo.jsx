"use client";

import { ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logout from "../Logout";

export default function UserInfo({ user }) {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Если клик был вне блока и вне кнопки, скрываем блок
      if (
        isVisible &&
        blockRef.current &&
        !blockRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    // Добавляем обработчик при монтировании
    document.addEventListener("mousedown", handleClickOutside);

    // Удаляем обработчик при демонтировании
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]); // Эффект зависит от состояния isVisible

  return (
    <li
      href="/dashboard"
      className="relative flex items-center gap-[11px] cursor-pointer"
    >
      <div className="w-5 h-5 flex justify-center items-center bg-gray">
        <h6 className="text-gray-dark">{user.name[0]}</h6>
      </div>
      <h6 className="w-[120px] truncate">{user.name}</h6>
      <ChevronDown
        className="w-5 text-gray-dark hover:text-black"
        ref={buttonRef}
        onClick={toggleVisibility}
      />

      {isVisible && (
        <div
          ref={blockRef}
          className="absolute top-8 min-w-[300px] text-gray-dark shadow-box z-20"
        >
          <ul className="p-3 border-b flex flex-col gap-3">
            <li className="flex">
              <div className="w-10 h-10 flex justify-center items-center bg-gray">
                <h6 className="text-2xl">{user.name[0]}</h6>
              </div>
              <div className="ml-3 text-black">
                <p className="text-sm">{user.name}</p>
                <p className="text-sm text-gray-dark">{user.role}</p>
              </div>
            </li>
            <li className="flex gap-1">
              <Link
                className="px-2 py-1 border flex gap-1 rounded-md hover:text-black"
                href="/dashboard"
                onClick={toggleVisibility}
              >
                <Settings className="w-5" />
                Настройки
              </Link>
              <Logout style="hover:text-black" onClick={toggleVisibility} />
            </li>
          </ul>

          <ul className="p-3 border-b flex flex-col gap-2">
            <li>
              <Link href="/dashboard" className="hover:text-black">
                Редактировать пользователей
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-black">
                В разработке
              </Link>
            </li>
          </ul>

          <ul className="p-3 flex flex-col gap-3">
            <li className="text-sm">{user.email}</li>
            <li className="text-sm">89384266063</li>
          </ul>
        </div>
      )}
    </li>
  );
}
