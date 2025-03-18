import { auth } from '@/auth';
import Logout from '@/components/Logout';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (session?.user.role !== 'admin') redirect('/home');

  if (session?.user.role === 'admin') {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>
          Вы авторизованы как администратор, добро пожаловать!{' '}
          <span>{session?.user.name}</span>
        </p>

        <Link
          href="/register"
          className="my-4 p-4 bg-green-500 rounded-sm outset bg-green"
        >
          Добавить нового пользователя
        </Link>
        <Link
          href="/users-edit"
          className="my-4 p-4 bg-green-500 rounded-sm outset bg-green"
        >
          Редактировать пользователей
        </Link>
        <Logout />
      </div>
    );
  }

  return <p>У вас нет права просматривать данную страницу</p>;
};

export default DashboardPage;
