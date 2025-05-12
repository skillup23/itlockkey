import { auth } from "@/auth";
import { faqLinks } from "@/data/arch";
import Link from "next/link";

import {
  ArchiveRestore,
  ChevronDown,
  ClipboardList,
  House,
  NotebookPen,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import LeftNavbar from "./navbar/LeftNavbar";
import NewTask from "./navbar/NewTask";
import UserInfo from "./navbar/UserInfo";

const Header = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  const userName = loggedInUser?.name;

  return (
    <header className="relative font-semibold z-10">
      <nav className="fixed top-0 left-0 h-10 w-full px-5 flex items-center bg-gray-light drop-shadow-sm">
        <div className="show-navbar">
          <p className="font-normal ">Главная \ Задачи</p>
        </div>
      </nav>
      <LeftNavbar>
        <ul className="w-[183px] flex flex-col">
          {userName ? (
            <UserInfo user={session?.user} />
          ) : (
            <Link href="/login" className="flex items-center gap-2">
              <UserRound size={20} />
              <h6 className="text-lg">Войти</h6>
            </Link>
          )}

          <li className="mt-6 flex flex-col text-gray-dark gap-2">
            <div className="flex items-center cursor-pointer gap-[11px] hover:text-black">
              <Search className="w-4" />
              <h6>Поиск</h6>
            </div>
            <Link
              href="/"
              className="flex items-center gap-[11px] hover:text-black"
            >
              <House className="w-4" />
              <h6>Домой</h6>
            </Link>

            {userName ? (
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/todos" className="hover:text-black">
                  <h6>Задачи</h6>
                </Link>
                <NewTask>
                  <Plus className="w-4" />
                  <h6>Новая задача</h6>
                </NewTask>

                <Link
                  href="/todos"
                  className="flex items-center gap-[11px] hover:text-black"
                >
                  <ClipboardList className="w-4" />
                  <h6>Текущие задачи</h6>
                </Link>
                <Link
                  href="/todos"
                  className="flex items-center gap-[11px] hover:text-black"
                >
                  <ArchiveRestore className="w-4" />
                  <h6>Архив</h6>
                </Link>
              </div>
            ) : (
              ""
            )}

            <div className="mt-6 flex items-center gap-4">
              <Link href="/blog" className="hover:text-black">
                <h6>FAQ</h6>
              </Link>
              <ChevronDown className="w-5 text-gray-dark hover:text-black cursor-pointer" />
            </div>
            {faqLinks.map((faqLink, index) => (
              <Link
                href={faqLink.link}
                key={index}
                className="flex items-center gap-[11px] text-gray-dark hover:text-black"
              >
                <NotebookPen className="w-4" />
                <h6>{faqLink.text}</h6>
              </Link>
            ))}

            <Link href="/backups" className="mt-6 hover:text-black">
              <h6>Бэкапы</h6>
            </Link>

            <Link href="/learn" className="hover:text-black">
              <h6>Обучение</h6>
            </Link>
          </li>
        </ul>
      </LeftNavbar>
    </header>
  );
};

export default Header;
