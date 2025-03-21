import { auth } from '@/auth';
import Link from 'next/link';

import {
  UserRound,
  ChevronDown,
  ChevronsLeft,
  Search,
  House,
  Plus,
  ClipboardList,
  ArchiveRestore,
  NotebookPen,
} from 'lucide-react';

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  const userName = loggedInUser?.name;

  return (
    <header className="font-semibold">
      <nav className="fixed top-0 left-[240px] h-10 w-full px-5 flex items-center bg-gray-light drop-shadow-sm">
        <p className="font-normal">Главная \ Задачи</p>
      </nav>
      <nav className="fixed top-0 left-0 bottom-0 w-[240px] py-[10px] px-4 bg-gray-light drop-shadow-sm">
        <ChevronsLeft className="absolute top-[10px] right-[10px] w-5 text-gray-dark cursor-pointer" />
        <ul className="flex flex-col">
          {userName ? (
            <li
              href="/dashboard"
              className="flex items-center gap-[11px] cursor-pointer"
            >
              <div className="w-5 h-5 flex justify-center items-center bg-gray">
                <h6 className="text-gray-dark">{session?.user.name[0]}</h6>
              </div>
              <h6 className="w-[120px] truncate">{session?.user.name}</h6>
              <ChevronDown className="w-5 text-gray-dark" />
            </li>
          ) : (
            <Link href="/login" className="">
              <UserRound size={20} />
              <h6 className="text-xl">Войти</h6>
            </Link>
          )}

          <li className="mt-6 flex flex-col text-gray-dark gap-2">
            <div className="flex items-center cursor-pointer gap-[11px]">
              <Search className="w-4 text-gray-dark" />
              <h6>Поиск</h6>
            </div>
            <Link href="/" className="flex items-center gap-[11px]">
              <House className="w-4 text-gray-dark" />
              <h6>Домой</h6>
            </Link>

            {userName ? (
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/todos">
                  <h6>Задачи</h6>
                </Link>
                <div className="flex items-center cursor-pointer gap-[11px]">
                  <Plus className="w-4 text-gray-dark" />
                  <h6>Новая задача</h6>
                </div>
                <Link href="/todos" className="flex items-center gap-[11px]">
                  <ClipboardList className="w-4 text-gray-dark" />
                  <h6>Текущие задачи</h6>
                </Link>
                <Link href="/todos" className="flex items-center gap-[11px]">
                  <ArchiveRestore className="w-4 text-gray-dark" />
                  <h6>Архив</h6>
                </Link>
              </div>
            ) : (
              ''
            )}

            <div className="mt-6 flex items-center gap-4">
              <Link href="/blog">
                <h6>FAQ</h6>
              </Link>
              <ChevronDown className="w-5 text-gray-dark cursor-pointer" />
            </div>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>Windows</h6>
            </Link>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>Frontend</h6>
            </Link>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>Ubuntu</h6>
            </Link>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>VPN</h6>
            </Link>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>VMware ESXi</h6>
            </Link>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>Nextcloud</h6>
            </Link>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>Яндекс</h6>
            </Link>
            <Link href="/blog" className="flex items-center gap-[11px]">
              <NotebookPen className="w-4 text-gray-dark" />
              <h6>Разное</h6>
            </Link>

            <Link href="/backups" className="mt-6">
              <h6>Бэкапы</h6>
            </Link>

            <Link href="/learn" className="">
              <h6>Обучение</h6>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
