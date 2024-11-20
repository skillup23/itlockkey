import Image from 'next/image';
import Logout from '@/components/Logout';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) redirect('/');

  // if (session?.user.role === 'admin') {
  //   return (
  //       <Link href="/dashboard">Управление приложением</Link>
  //   );
  // }

  return (
    <div className="flex flex-col items-center m-4">
      {session?.user?.image && session?.user?.name ? (
        <>
          <h2 className="text-3xl my-2">Welcome, {session?.user?.name}</h2>
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={72}
            height={72}
            className="rounded-full"
          />
        </>
      ) : (
        <h2 className="text-3xl my-2">
          Добро пожаловать, {session?.user?.email}
        </h2>
      )}
      {session?.user.role === 'admin' ? (
        <Link
          href="/dashboard"
          className="my-4 p-2  bg-green-500 text-white rounded"
        >
          Управление приложением
        </Link>
      ) : (
        ''
      )}

      <Logout />
    </div>
  );
};

export default HomePage;
