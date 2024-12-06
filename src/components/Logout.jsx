import { doLogout } from '@/app/actions';

const Logout = () => {
  return (
    <form action={doLogout}>
      <button
        className="bg-blue my-2 text-white p-2 rounded mt-10 w-40 mx-auto outset"
        type="submit"
      >
        Выйти
      </button>
    </form>
  );
};

export default Logout;
