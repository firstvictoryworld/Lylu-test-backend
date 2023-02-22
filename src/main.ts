import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { CONFIG } from '@shared/constants/global.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  });
  app.setGlobalPrefix(CONFIG.API_PREFIX);

  app.use(express.static('public'));

  await app.listen(CONFIG.PORT).then(() => {
    console.log(`API server started on port ${CONFIG.PORT}`);
  });
}
bootstrap();
