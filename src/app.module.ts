import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import CONFIG from './utils/config';

@Module({
  imports: [MongooseModule.forRoot(CONFIG.MONGODB_URI), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
