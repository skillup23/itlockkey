import { getPostBySlug } from '@/util/utils';
import Link from 'next/link';
import React from 'react';

const getPageData = async (slug) => {
  const { meta, content } = await getPostBySlug(slug);
  return { meta, content };
};

export async function generateMetadata({ params }) {
  const { meta } = await getPageData(params.slug);
  return { title: meta.title };
}

export default async function Post({ params }) {
  const { meta, content } = await getPageData(params.slug);

  return (
    <section className="p-4 mb-10">
      <article className="container py-4 m-auto prose prose-pre:mt-2">
        {content}
        <h6 className="text-right">Автор: {meta.author}</h6>
        <h6 className="text-right">Дата публикации: {meta.publishDate}</h6>
        <Link
          className="mt-16 p-4 bg-slate-800 text-white rounded-md no-underline hover:bg-slate-900"
          href="/blog"
        >
          Вернуться назад
        </Link>
      </article>
    </section>
  );
}