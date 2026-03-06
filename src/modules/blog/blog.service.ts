import { IBlog, ICreateBlogParams, IEditBlogParams } from './blog.interface.js';
import {
  blogCacheById,
  blogCacheByTitle,
  findBlogById,
  findBlogByTitle,
} from './blog.store.js';
import { AppError } from '../../class/appError.js';
import { randomUUID } from 'crypto';
import { createExcerpt, createSlug } from './blog.helper.js';
import { saveBlog } from './blog.repository.js';
import stringNormalization from '../../helpers/string-normalization.helper.js';

export async function createBlog(params: ICreateBlogParams) {
  try {
    const isExists = findBlogByTitle(params.title);
    if (isExists) throw new AppError(409, 'Blog title already exists.');

    const slug = createSlug(params.title);
    const excerpt = createExcerpt(params.content);
    const blog: IBlog = {
      id: randomUUID(),
      title: params.title,
      slug,
      excerpt,
      content: params.content,
      authorName: params.authorName ?? 'Company Editorial Team',
      category: params.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blogCacheById.set(blog.id, blog);
    blogCacheByTitle.set(stringNormalization(blog.title), blog);
    const blogs = Array.from(blogCacheById.values());
    await saveBlog(blogs);

    return blog;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}

export async function editBlog(params: IEditBlogParams) {
  let newTitleKey = '';

  try {
    const found = findBlogById(params.id);
    if (!found) throw new AppError(404, 'Invalid blog id');
    if (params.title) {
      const isExists = findBlogByTitle(params.title);
      if (isExists && isExists.id !== found.id)
        throw new AppError(409, 'Blog title already exists.');
      newTitleKey = stringNormalization(params.title) ?? found.title;
    }
    const oldTitleKey = stringNormalization(found.title);

    const data = {
      ...found,
      ...(params.title !== undefined && {
        title: params.title,
        slug: createSlug(params.title),
      }),
      ...(params.content !== undefined && { content: params.content }),
      ...(params.category !== undefined && { category: params.category }),
      ...(params.authorName !== undefined && { authorName: params.authorName }),
      updatedAt: new Date().toISOString(),
    };

    if (oldTitleKey !== newTitleKey) {
      blogCacheByTitle.delete(oldTitleKey);
    }

    blogCacheById.set(data.id, data);
    blogCacheByTitle.set(stringNormalization(data.title), data);
    await saveBlog(Array.from(blogCacheById.values()));

    return data;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}

export function getAllBlogs() {
  return Array.from(blogCacheById.values());
}

export function getBlogById(id: string) {
  try {
    const found = findBlogById(id);
    if (!found) throw new AppError(404, 'Invalid blog id');

    return found;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}
