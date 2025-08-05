import { getPostsMetaData } from '@/util/utils';
import Link from 'next/link';

export default async function PostPreview({ groupTitle, groupName }) {
  const posts = await getPostsMetaData(groupName);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl bg-gray pl-2">{groupTitle}</h2>
      <div className="flex gap-4 flex-wrap">
        {posts.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            key={index}
            className="p-4 border min-w-40 hover:shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div className="flex justify-between">
              <p className="font-medium">{post.author}</p>
              <p className="italic">{post.publishDate}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
