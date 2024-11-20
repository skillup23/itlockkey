import JerryStory from '@/components/jerry/jerry-story';
import TomStory from '@/components/tom/tom-story';
import Link from 'next/link';

export default function Landing() {
  return (
    <>
      <div className="text-center text-2xl">Landing Page</div>
      <div className="flex flex-col justify-center items-center p-8 gap-4">
        <Link className="text-3xl underline" href="/products">
          All Products
        </Link>
        <Link className="text-3xl underline" href="/blog">
          Blog
        </Link>

        {/* <TomStory />
        <JerryStory /> */}
      </div>
    </>
  );
}
