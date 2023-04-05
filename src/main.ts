import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from './utils/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  await app.listen(CONFIG.PORT);
}
bootstrap();
