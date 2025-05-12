"use client";

// import SocialLogin from './SocialLogin';
import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  //Начало ошибки гидратации https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  //Конец ошибки гидратации

  const [error, setError] = useState("");
  const router = useRouter();

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      //получаем значения полей ввода
      const formData = new FormData(event.currentTarget);
      //отправляем в сервеный компонент
      const response = await doCredentialLogin(formData);

      //если ошибка, то возращаем ошибку
      if (!!response.error) {
        setError(response.error.message);
        //если нет ошибок, то перенаправляем на домашнюю страницу
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Проверьте имя пользователя или пароль");
    }
  }

  return (
    <>
      {isClient ? (
        <div>
          <p className="text-xl text-red-500">{error}</p>
          <form
            className="w-[305px] flex flex-col items-start rounded-2xl gap-4"
            onSubmit={handleFormSubmit}
          >
            <input
              className="w-full p-1 rounded-md placeholder-center text-center border"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />

            <input
              className="w-full p-1 rounded-md placeholder-center text-center border"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
            />

            <SubmitButton
              cssStyle="w-full flex justify-center text-black bg-gray-light hover:bg-gray"
              text="Войти"
              textLoad="Входим..."
            />
          </form>
          {/* <SocialLogin /> */}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginForm;
