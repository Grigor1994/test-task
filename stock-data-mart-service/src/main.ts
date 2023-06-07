import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Common } from './utils/constants/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(Common.GLOBAL_PREFIX);

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('APP_PORT');
  await app.listen(APP_PORT);
}
bootstrap();
