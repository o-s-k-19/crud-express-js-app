import { postService } from "../services/post.service";
import { Request, Response } from "express";
import { PostSchemaValidator } from "../models/post";
import { title } from "process";


class PostController {

    addPost = async (req: Request, res: Response) => {
        const post = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            published: req.body.published,
            date: req.body.date
        }

        const {error, value} = PostSchemaValidator.validate(post);
        if(error) {
            return res.status(400).json({message: error.message});
        }else{
            try {
                const newPost = await postService.createPost(post);
                return res.status(201).json(newPost);
            } catch (error) {
                return res.status(500).json({message: error});
            }
        }
    }
 
    getPosts = async (req: Request, res: Response) => {
        try {
            const posts = await postService.getPosts();
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }

    getPostById = async (req: Request, res: Response) => {
        const postId = req.params.id;
        try {
            const post = await postService.getPostById(postId);
            if(post === 'Post not found') {
                return res.status(404).json({message: post});
            }
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }

    updatePost = async (req: Request, res: Response) => {
        const postId = req.params.id;
        const post = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            published: req.body.published,
            date: req.body.date
        }
        try{
        const updatePost = await postService.updatePost(postId, post);
        if(updatePost === 'Could not update, Post not found') {
            return res.status(404).json({message: updatePost});
        }
        return res.status(200).json(updatePost);
    } catch (error) {
        return res.status(500).json({message: error});
    }
    }

    deletePost = async (req: Request, res: Response) => {
        const postId = req.params.id;
        try {
            const deletedPost = await postService.deletePost(postId);
            if(deletedPost === 'Post not found') {
                return res.status(404).json({message: deletedPost});
            }
            return res.status(200).json({message: deletedPost});
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }
}

export const postController = new PostController();