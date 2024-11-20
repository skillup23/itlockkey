import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Register = async () => {
  const session = await auth();
  if (!session?.user) redirect('/');
  if (session?.user.role !== 'admin') redirect('/home');

  if (session?.user.role === 'admin') {
    return (
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl my-3">Зарегистрировать нового пользователя</h1>
        <RegistrationForm />
        <p className="my-3">
          У вас уже есть аккаунт?
          <Link href="/login" className="mx-2 underline">
            Войти в систему
          </Link>
        </p>
      </div>
    );
  }

  return <p>У вас нет права просматривать данную страницу</p>;
};

export default Register;
