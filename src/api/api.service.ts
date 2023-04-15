import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel(Post.name)
        private postModel: Model<PostDocument>,
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async createPost(raw: string, commentsEnabled: boolean, isPrivate: boolean, createdBy: string) {

        const headingIndex = raw.indexOf('\n');
        const title = raw.slice(0, headingIndex);
        const body = raw.slice(headingIndex + 1);

        const commentsCount = commentsEnabled ? 0 : null;

        const newPostObject = new this.postModel({
            title: title,
            body: body,
            raw: raw,
            commentsEnabled: commentsEnabled,
            isPrivate: isPrivate,
            commentsCount: commentsCount,
            timestamp: Date.now(),
            createdBy: createdBy
        });

        return newPostObject.save()
    }

    async getPosts(userId: string, skip: number, limit: number) {

        const findAllQuery = this.postModel
            .find({ createdBy: userId })
            .sort({ timestamp: -1 })
            .skip(skip);

        if (limit) {
            findAllQuery.limit(limit);
        }

        const posts = await findAllQuery;
        const count = await this.postModel.count({ createdBy: userId });

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

    async update(id: string, raw: any, isPrivate: boolean, disableComments: boolean) {
        const headingIndex = raw.indexOf('\n');
        const title = raw.slice(0, headingIndex);
        const body = raw.slice(headingIndex + 1);
        return this.postModel.findByIdAndUpdate(id, { title: title, body: body, raw: raw, isPrivate: isPrivate, commentsEnabled: !disableComments, lastUpdated: Date.now() });
    }

    async getPublicPosts(username: string, skip: number, limit: number) {

        const userId = await this.userModel.findOne({ username: username }, { _id: 1 });

        if (!userId) {
            return 1;
        }

        const findAllQuery = this.postModel
            .find({ isPrivate: false, createdBy: userId })
            .sort({ timestamp: -1 })
            .skip(skip);

        if (limit) {
            findAllQuery.limit(limit);
        }

        const posts = await findAllQuery;
        const count = await this.postModel.count({ isPrivate: false, createdBy: userId });

        return { posts, count }
    }

    async getPublicPost(username: string, postId: string) {

        const userId = await this.userModel.findOne({ username: username }, { _id: 1 });
        if (!userId) {
            return 1;
        }
        const findOneQuery = this.postModel
            .findOne({ isPrivate: false, createdBy: userId, _id: postId })
        const post = await findOneQuery;
        return post;
    }

    async getPrivatePosts(username: string, skip: number, limit: number) {

        const userId = await this.userModel.findOne({ username: username }, { _id: 1 });

        if (!userId) {
            return 1;
        }

        const findAllQuery = this.postModel
            .find({ isPrivate: true, createdBy: userId })
            .sort({ timestamp: -1 })
            .skip(skip);

        if (limit) {
            findAllQuery.limit(limit);
        }

        const posts = await findAllQuery;
        const count = await this.postModel.count({ isPrivate: true, createdBy: userId });

        return { posts, count }
    }

}
