import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'chat.oracle.aquabx.ovh' });
  await app.listen(443);
  console.log(process.env);
}
bootstrap();
