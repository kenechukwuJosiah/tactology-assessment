import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new Logger('TACTOLOGY APP');
  const port = configService.get<number>('APP_PORT') || 3000;
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
  logger.debug(`APP RUNNING ON http://localhost:${port}`);
}
bootstrap();
