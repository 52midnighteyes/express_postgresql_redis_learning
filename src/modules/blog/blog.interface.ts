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
  createdAt: Date;
  updatedAt?: Date | null;
}

// ------- params
export interface ICreateBlogParams {
  title: string;
  content: string;
  authorName: string;
  category: CategoryEnum;
}

export interface ICreateBlogDb {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  category: CategoryEnum;
}

export interface IUpdateBlogParams {
  id: string;
  title?: string;
  content?: string;
  authorName?: string;
  category?: CategoryEnum;
}

export interface IUpdateBlogDb {
  title?: string;
  content?: string;
  authorName?: string;
  category?: CategoryEnum;
  updatedAt: Date | null;
}
