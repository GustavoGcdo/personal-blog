import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Post } from '../interfaces';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const date = format(new Date(data.publishedAt), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  return {
    slug: realSlug,
    ...data,
    publishedAt: data.publishedAt.toString(),
    formatedDate: date,
    content,
  } as Post;
}

export function getSortedPostsData() {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (new Date(post1.publishedAt) > new Date(post2.publishedAt) ? -1 : 1));

  return posts;
}
