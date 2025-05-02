import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://172.20.10.2:3000',
      'http://172.27.192.1:3000',
      'http://172.27.192.2:3000',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(4500);
}
bootstrap();
