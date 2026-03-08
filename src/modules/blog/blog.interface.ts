import { CategoryEnum } from '../../generated/prisma/enums.js';
// ------- interface

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName?: string;
  category: CategoryEnum;
  createdAt: string;
  updatedAt?: string;
}

// ------- params
export interface ICreateBlogParams {
  title: string;
  content: string;
  authorName: string;
  category: CategoryEnum;
}

export interface IEditBlogParams {
  id: string;
  title?: string;
  content?: string;
  authorName?: string;
  category?: CategoryEnum;
}
