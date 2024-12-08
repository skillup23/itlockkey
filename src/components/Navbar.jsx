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
    <header className="fixed top-0 left-0 bottom-0 w-52 py-10 px-4 flex bg-gray text-white rounded-r-xl outset-header z-50">
      <nav className="w-full">
        <ul className="my-auto flex flex-col items-center pt-1 gap-6">
          {userName ? (
            <Link
              href="/dashboard"
              className="p-4 flex flex-col items-center outset-nav rounded-lg"
            >
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
            <Link
              href="/login"
              className="mx-2 p-4 flex items-center gap-2 outset-nav rounded-lg"
            >
              <UserRound size={20} />
              <h6 className="text-xl">Войти</h6>
            </Link>
          )}
          <Link href="/" className="outset-nav rounded-lg">
            <h6 className="p-4 text-xl">Главная</h6>
          </Link>
          <Link href="/blog" className="outset-nav rounded-lg">
            <h6 className="p-4 text-xl">FAQ</h6>
          </Link>
          <Link href="/todos" className="outset-nav rounded-lg">
            <h6 className="p-4 text-xl">Задачи</h6>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
