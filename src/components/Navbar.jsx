import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
// import Logout from './Logout';

import { UserRound } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  // console.log(loggedInUser);
  const userName = loggedInUser?.name;

  return (
    <header className="">
      <nav className="fixed top-0 left-[240px] h-10 w-full px-5 flex items-center bg-gray-light drop-shadow-sm">
        <p>Главная \ Задачи</p>
      </nav>
      <nav className="fixed top-0 left-0 bottom-0 w-[240px] bg-gray-light drop-shadow-sm">
        <ul className="flex flex-col">
          {userName ? (
            <Link href="/dashboard" className="p-4 flex flex-col">
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  width={25}
                  height={25}
                  className="rounded-full"
                />
              ) : (
                <UserRound size={48} />
              )}

              <h6>{session?.user.name}</h6>
            </Link>
          ) : (
            <Link href="/login" className="">
              <UserRound size={20} />
              <h6 className="text-xl">Войти</h6>
            </Link>
          )}
          <Link href="/" className="">
            <h6 className="p-4 text-xl">Главная</h6>
          </Link>
          <Link href="/blog" className="">
            <h6 className="p-4 text-xl">FAQ</h6>
          </Link>
          <Link href="/todos" className="">
            <h6 className="p-4 text-xl">Задачи</h6>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
