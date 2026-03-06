// ------- enum
export enum EBlogCategory {
  MATCH = 'match',
  PLAYER = 'player',
  TRANSFER = 'transfer',
  NEWS = 'news',
  FANS = 'fans',
  HISTORY = 'history',
  TRAINING = 'training',
  EVENT = 'event',
  MERCH = 'merch',
}
// ------- interface

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName?: string;
  category: EBlogCategory;
  createdAt: string;
  updatedAt?: string;
}

// ------- params
export interface ICreateBlogParams {
  title: string;
  content: string;
  authorName: string;
  category: EBlogCategory;
}

export interface IEditBlogParams {
  id: string;
  title?: string;
  content?: string;
  authorName?: string;
  category?: EBlogCategory;
}
