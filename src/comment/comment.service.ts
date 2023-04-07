import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name)
        private commentModel: Model<CommentDocument>,   
        @InjectModel(Post.name)
        private postModel: Model<PostDocument>,   
    ) {}

    async createComment(text: string, email: string, nickname: string, isReply: boolean, parentCommentId: string, postId: string) {
        const newComm = new this.commentModel({
            text: text,
            email: email,
            nickname: nickname,
            isReply: isReply,
            post: postId,
            parentComment: parentCommentId,
            timestamp: Date.now()
        });

        const post = await this.postModel.findById(postId);

        if (post && post.commentsCount) {
            post.commentsCount = post.commentsCount + 1;
        } else {
            post.commentsCount = 1;
        }
        post.save();
 
        return newComm.save();
    }

    async getComment(commentId: string) {
        return await this.commentModel.findById(commentId);
    }

    async getComments(postId: string) {
        return await this.commentModel.find({ post: postId, isReply: false }).sort({ timestamp: -1 });
    }

    async getReply(postId: string, commentId: string) {
        return await this.commentModel.find({ post: postId, parentComment: commentId, isReply: true });
    }

}
