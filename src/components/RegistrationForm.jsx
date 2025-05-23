'use client';

// import SocialLogin from './SocialLogin';
import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      //получаем значения полей ввода
      const formData = new FormData(event.currentTarget);

      const name = formData.get('name');
      const email = formData.get('email');
      const password = formData.get('password');
      const role = 'user';

      //Отправляем POST запрос с данными в серверный компонент
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      //если регистрация успешна то перенаправь пользователя на страницу входа
      response.status === 201 && router.push('/login');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="my-2">
          <label htmlFor="name">Имя пользователя</label>
          <input
            className="border mx-2 border-gray-500 rounded-sm"
            type="text"
            name="name"
            id="name"
          />
        </div>

        <div className="my-2">
          <label htmlFor="email">Email</label>
          <input
            className="border mx-2 border-gray-500 rounded-sm"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Пароль</label>
          <input
            className="border mx-2 border-gray-500 rounded-sm"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded-sm flex justify-center items-center"
        >
          Зарегистрироваться
        </button>
      </form>
      {/* <SocialLogin /> */}
    </>
  );
};

export default RegistrationForm;
