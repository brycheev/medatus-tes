import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './configs/app.config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(AppConfig);

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Auth service')
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup('swagger', app, document);
  }

  const logger = new Logger('Bootstrap');

  await app.listen(config.port, () =>
    logger.debug(`Service available on port: ${config.port}`),
  );
}
bootstrap();
