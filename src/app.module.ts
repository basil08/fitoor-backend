import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import CONFIG from './utils/config';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [MongooseModule.forRoot(CONFIG.MONGODB_URI), AuthModule, ApiModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
