import stringNormalization from '../../helpers/string-normalization.helper.js';
import { IBlog } from './blog.interface.js';
import { getBlogs } from './blog.repository.js';

export const blogCacheById = new Map<string, IBlog>();
export const blogCacheByTitle = new Map<string, IBlog>();

export async function cacheBlogs(): Promise<void> {
  const data = await getBlogs();
  blogCacheById.clear();
  blogCacheByTitle.clear();

  for (const d of data) {
    blogCacheById.set(d.id, d);
    blogCacheByTitle.set(stringNormalization(d.title), d);
  }

  console.log('🔥 Blogs loaded into memory on startup');
}

export function findBlogByTitle(title: string) {
  return blogCacheByTitle.get(stringNormalization(title)) ?? null;
}

export function findBlogById(id: string) {
  return blogCacheById.get(id) ?? null;
}
