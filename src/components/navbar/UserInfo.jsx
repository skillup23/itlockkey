"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
          className="absolute top-8 w-[300px] h-[250px] shadow-box z-50"
        ></div>
      )}
    </li>
  );
}
