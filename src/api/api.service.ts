import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel(Post.name)
        private postModel: Model<PostDocument>,    
    ) {}

    async createPost(raw: string) {

        const headingIndex = raw.indexOf('\n');
        const title = raw.slice(0, headingIndex);
        const body = raw.slice(headingIndex + 1);

        const newPostObject = new this.postModel({
            title: title,
            body: body,
            raw: raw,
            timestamp: Date.now()
        });

        return newPostObject.save()
    }

    async getPosts(skip: number, limit: number) {

        const findAllQuery = this.postModel
        .find()
        .sort({ _id: -1 })
        .skip(skip);

        if (limit) {
            findAllQuery.limit(limit);
        }
        
        const posts = await findAllQuery;
        const count = await this.postModel.count();

        return { posts, count }
    }

    async getPost(postId: string) {
        const post = this.postModel.findById(postId);

        if (!post) return null;
        else return post;
    }

    async deletePost(postId: string) {
        const deleted = this.postModel.deleteOne({ _id: postId });
        return deleted;
    }
}
