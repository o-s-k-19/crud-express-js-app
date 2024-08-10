import { PostModel } from "../models/post";

export class PostService {

    async createPost(post: any) {
        try {
            const newPost = await PostModel.create(post);
            return newPost;
        } catch (error) {
            throw error;
        }
    }

    async getPosts() {
        try {
            const posts = await PostModel.find({});
            return posts;
        } catch (error) {
            throw error;
        }
    }

    async getPostById(postId: string) {
        try {
            const post = await PostModel.findById({_id: postId});
            if(!post) {
                return 'Post not found';
            }
            return post;
        } catch (error) {
            throw error;
        }
    }

    async updatePost(postId: string, post: any) {
        try {
            const updatedPost = await PostModel.findByIdAndUpdate({_id: postId}, post, {new: true});
            if(!updatedPost) {
                return 'Could not update, Post not found';
            }
            return updatedPost;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(postId: string) {
        try {
            const deletedPost = await PostModel.findByIdAndDelete({_id: postId});
            if(!deletedPost) {
                return 'Post not found';
            }
            return 'Post deleted';
        } catch (error) {
            throw error;
        }
    }

}

export const postService = new PostService();