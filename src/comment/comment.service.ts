import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import { Post, PostDocument } from 'src/schemas/post.schema';
import CONFIG from 'src/utils/config';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name)
        private commentModel: Model<CommentDocument>,
        @InjectModel(Post.name)
        private postModel: Model<PostDocument>,
    ) { }

    async createComment(text: string, email: string, nickname: string, isReply: boolean, parentCommentId: string, postId: string, captchaToken: string) {

        const post = await this.postModel.findById(postId);
        if (post) {
            if (!post.commentsEnabled) {
               return -1;
            }
        }
        
        const captchaRes = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${CONFIG.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
        );

        if (captchaRes.data.success) {
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

            if (post) {
                post.commentsCount = post.commentsCount + 1;
                post.save();
            }

            return newComm.save();
        } else {
            return { message: 'Non-human suspected!' };
        }
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
