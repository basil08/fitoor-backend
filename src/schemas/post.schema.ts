import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Post {
  @Prop({ required: false, default: 'My Blog Post' })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  raw: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: false, default: false })
  isPrivate: boolean;

  @Prop({required: false, default: true })
  commentsEnabled: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: User;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
