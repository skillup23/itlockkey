import Link from 'next/link';
import { getPostsMetaData } from '@/util/utils';

export default async function PostPreview({ groupTitle, groupName }) {
  const posts = await getPostsMetaData(groupName);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">{groupTitle}</h2>
      <div className="flex gap-4 flex-wrap">
        {posts.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            key={index}
            className="p-8 border border-slate-800 min-w-40 max-w-96 hover:shadow-xl shadow-slate-900"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="font-medium">{post.author}</p>
            <p className="italic">{post.publishDate}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
