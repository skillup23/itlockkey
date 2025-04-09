import { doLogout } from "@/app/actions";

const Logout = ({ style }) => {
  return (
    <form action={doLogout}>
      <button className={style} type="submit">
        Выход
      </button>
    </form>
  );
};

export default Logout;
