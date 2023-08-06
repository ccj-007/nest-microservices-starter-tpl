import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startNacos } from '../nacos';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await startNacos();
  await app.listen(4000);
}

bootstrap();
