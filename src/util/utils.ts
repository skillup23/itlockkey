import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';

// Компоненты импортируемые на MDX страницы
const components = {
  Link,
};

// Выше импортируем модули для работы с файловой системой

// указываем директорию где храняться mdx файлы
const rootDir = path.join(process.cwd(), 'src/app/blog/blog-posts');
// const rootDir = path.join(process.cwd(), 'src', 'app', 'blog', 'blog-posts');

// Функция getPostBySlug извлекает содержимое публикации в блоге по её идентификатору (имени файла без расширения .mdx),
// формирует путь к файлу на основе идентификатора и синхронно считывает содержимое файла.
// Она использует compileMDX для преобразования содержимого MDX в HTML, извлекая при этом метаданные (метаинформацию) и содержимое публикации.
export const getPostBySlug = async (slug: string) => {
  const fileName = slug.replace('.mdx', '');
  const filePath = await path.join(rootDir, `${fileName}.mdx`);
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: components,
  });
  return { meta: { ...frontmatter, slug: path.parse(fileName).name }, content };
};

// Функция getPostsMetaData извлекает метаданные для всех постов в блоге. Она считывает список файлов из каталога постов в блоге,
// перебирает каждый файл, чтобы извлечь его метаданные с помощью getPostBySlug и накапливает метаданные в массиве перед возвратом.
export const getPostsMetaData = async (groupName: string) => {
  const files = fs.readdirSync(rootDir);
  let posts = [];
  for (const fileName of files) {
    const { meta } = await getPostBySlug(fileName);
    posts.push(meta);
  }
  return posts.filter((post) => post.group === groupName);
};
