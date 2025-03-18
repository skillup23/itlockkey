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
            className="my-5 flex flex-col items-start p-5 outset rounded-2xl"
            onSubmit={handleFormSubmit}
          >
            <div className="my-2 w-full">
              <label htmlFor="email">Email</label>
              <input
                className="rounded-sm inset-input"
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className="my-2 w-full">
              <label htmlFor="password">Пароль</label>
              <input
                className="rounded-sm inset-input"
                type="password"
                name="password"
                id="password"
              />
            </div>

            {/* <button
              type="submit"
              className="bg-orange-300 mt-4 rounded-sm flex justify-center items-center w-36"
            >
              Войти
            </button> */}

            <SubmitButton
              cssStyle="bg-blue text-white"
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
