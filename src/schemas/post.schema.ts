import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
