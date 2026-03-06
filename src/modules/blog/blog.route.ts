import { Router } from 'express';
import tokenVerification from '../../middlewares/tokenVerification.middleware.js';
import {
  createBlogController,
  editBlogController,
  getAllBlogsController,
  getBlogByIdController,
} from './blog.controller.js';

const router = Router();

router.get('/', getAllBlogsController);
router.get('/:id', getBlogByIdController);
router.post('/', tokenVerification, createBlogController);
router.patch('/:id', tokenVerification, editBlogController);

export default router;
