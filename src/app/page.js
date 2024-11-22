import Link from 'next/link';

export default function Landing() {
  return (
    <>
      <div className="text-center text-2xl">Главная страница</div>
      <div className="flex flex-col justify-center items-center p-8 gap-4">
        <Link className="text-3xl underline" href="/products">
          Все продукты
        </Link>
        <Link className="text-3xl underline" href="/blog">
          FAQ
        </Link>
        <Link className="text-3xl underline" href="/todos">
          Задачи
        </Link>
      </div>
    </>
  );
}
