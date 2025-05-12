import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-xl my-3">Привет! Пора войти в систему.</h1>
      <LoginForm />
      <p className="my-3 text-base text-center">
        Нет аккаунта? <br /> Тогда пиши сюда admin@it-kireev.ru
        {/* <Link href="register" className="mx-2 underline">
          Register
        </Link> */}
      </p>
    </div>
  );
};

export default LoginPage;
