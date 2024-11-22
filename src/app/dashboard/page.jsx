import { auth } from '@/auth';
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
          className="my-4 p-2 bg-green-500 text-white rounded"
        >
          Добавить нового пользователя
        </Link>
        <Link
          href="/users-edit"
          className="my-4 p-2 bg-green-500 text-white rounded"
        >
          Редактировать пользователей
        </Link>
      </div>
    );
  }

  return <p>У вас нет права просматривать данную страницу</p>;
};

export default DashboardPage;
