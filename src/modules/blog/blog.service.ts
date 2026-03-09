import {
  createBlogRepo,
  findBlogById,
  findBlogByTitle,
  getAllBlogRepo,
  updateBlogRepo,
} from './blog.repository.js';
import { AppError } from '../../class/appError.js';
import { createExcerpt, createSlug } from './blog.helper.js';
import stringNormalization from '../../helpers/string-normalization.helper.js';
import { prisma } from '../../libs/prisma/prisma.js';
import {
  IBlog,
  ICreateBlogDb,
  ICreateBlogParams,
  IUpdateBlogDb,
  IUpdateBlogParams,
} from './blog.interface.js';

export async function createBlog(params: ICreateBlogParams) {
  try {
    const isExists = await findBlogByTitle(params.title);
    if (isExists) throw new AppError(409, 'Blog title already exists.');

    const slug = createSlug(params.title);
    const excerpt = createExcerpt(params.content);
    let payload: ICreateBlogDb = {
      title: params.title,
      slug,
      excerpt,
      content: params.content,
      authorName: params.authorName ?? 'Company Editorial Team',
      category: params.category,
    };

    const blog: IBlog = await createBlogRepo(payload);

    return blog;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}

export async function updateBlog(params: IUpdateBlogParams) {
  let newTitleKey = '';

  try {
    const found = await findBlogById(params.id);
    if (!found) throw new AppError(404, 'Invalid blog id');
    if (params.title) {
      const isExists = await findBlogByTitle(params.title);
      if (isExists && isExists.id !== found.id)
        throw new AppError(409, 'Blog title already exists.');
      newTitleKey = stringNormalization(params.title) ?? found.title;
    }

    const oldTitleKey = stringNormalization(found.title);

    const payload: IUpdateBlogDb = {
      ...(params.title !== undefined && {
        title: params.title,
        slug: createSlug(params.title),
      }),
      ...(params.content !== undefined && { content: params.content }),
      ...(params.category !== undefined && { category: params.category }),
      ...(params.authorName !== undefined && { authorName: params.authorName }),
      updatedAt: new Date(),
    };

    const data = await updateBlogRepo(payload, params.id, prisma);

    return data;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}

export async function getAllBlogs() {
  try {
    return await getAllBlogRepo();
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}

export async function getBlogById(id: string) {
  try {
    const found = await findBlogById(id);
    if (!found) throw new AppError(404, 'Invalid blog id');

    return found;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}
