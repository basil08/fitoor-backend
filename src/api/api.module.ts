import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { Post, PostSchema } from '../schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }, { name: User.name, schema: UserSchema }]),
  ],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
