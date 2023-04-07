import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './post.schema';

@Schema()
export class Comment {

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    text: string;

    @Prop({ required: false, default: "Anonymous" })
    nickname: string;

    @Prop({ required: true })
    timestamp: Date;

    // is this comment a reply to another comment in the thread?
    @Prop({ required: true, default: false })
    isReply: boolean;

    @Prop({ required: false, default: null, type: mongoose.Schema.Types.ObjectId })
    parentComment: Comment;

    // Post for which this is a comment
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    post: Post;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
