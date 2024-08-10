import express from 'express';
import { postController } from '../controllers/post.controller';

export const router = express.Router();


router.post('/', postController.addPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);