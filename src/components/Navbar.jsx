import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/auth';
// import Logout from './Logout';

import { UserRound } from 'lucide-react';

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  // console.log(loggedInUser);
  const userName = loggedInUser?.name;

  return (
    <header className="fixed top-0 left-0 bottom-0 w-72 py-10 px-4 flex bg-gray text-white rounded-r-xl outset-header z-50">
      <nav className="w-full">
        <ul className="my-auto flex flex-col items-center pt-1 gap-10">
          {userName ? (
            <li className="p-4 flex flex-col items-center outset-nav rounded-lg">
              <Link href="/dashboard">
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
              </Link>
              <h6>{session?.user.name}</h6>
            </li>
          ) : (
            <li className="mx-2 outset-nav rounded-lg">
              <Link href="/login" className="p-4 flex items-center gap-2">
                <UserRound size={20} />
                <h6 className="text-xl">Войти</h6>
              </Link>
            </li>
          )}
          <li className="outset-nav rounded-lg">
            <Link href="/">
              <h6 className="p-4 text-xl">Главная</h6>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
