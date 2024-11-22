import PostPreview from '@/components/blog/PostPreview';

export default function Blog() {
  return (
    <section className="container m-auto p-4 sm:p-8">
      <h1 className="text-3xl font-semibold">My Blog Posts</h1>
      <div className="flex flex-col gap-8 my-8">
        <PostPreview groupTitle={'Frontend'} groupName="frontend" />
        <PostPreview groupTitle={'Ubuntu'} groupName="ubuntu" />
        <PostPreview groupTitle={'VMware ESXi'} groupName="esxi" />
        <PostPreview groupTitle={'Nextcloud'} groupName="nextcloud" />
        <PostPreview groupTitle={'Яндекс'} groupName="yandex" />
        <PostPreview groupTitle={'Различная информация'} groupName="other" />
      </div>
    </section>
  );
}
