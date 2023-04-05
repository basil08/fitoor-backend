import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from './utils/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: [
    "https://fitoor-frontend.vercel.app",
    "http://localhost:3000"
  ]});
  await app.listen(CONFIG.PORT);
}
bootstrap();
