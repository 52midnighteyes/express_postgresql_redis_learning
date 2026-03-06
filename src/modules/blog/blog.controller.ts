import { Request, Response, NextFunction } from 'express';
import { ICreateBlogParams, IEditBlogParams } from './blog.interface.js';
import {
  createBlog,
  editBlog,
  getAllBlogs,
  getBlogById,
} from './blog.service.js';

export async function createBlogController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const params: ICreateBlogParams = req.body;
    const response = await createBlog(params);

    res.status(201).json({
      message: 'Blog post created successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

export async function editBlogController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const params = req.body;
    const { id } = req.params;
    const response = await editBlog({ ...params, id } as IEditBlogParams);
    console.log(response);

    res.status(200).json({
      message: 'Blog post successfully edited.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllBlogsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = getAllBlogs();

    res.status(200).json({
      message: 'Blogs fetched successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBlogByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const response = getBlogById(id as string);

    res.status(200).json({
      message: 'Blog fetched successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
