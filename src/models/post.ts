import {Schema, model} from 'mongoose';
import Joi from 'joi';

export const PostSchemaValidator = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
    published: Joi.boolean().required(),
    date: Joi.date().required()
});

interface IPost{
    title: string;
    content: string;
    author: string;
    published: boolean;
    date: Date;
}

const postSchema = new Schema<IPost>({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    published: {type: Boolean, required: true, default: false},
    date: {type: Date,required: true, default: Date.now}
});


export const PostModel = model<IPost>('Post', postSchema);