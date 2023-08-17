import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './app/app.config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const documentConfig = new DocumentBuilder()
    .setTitle('Seleccionado10')
    .setDescription('Dating app or cuevana app')
    .setVersion('1.0')
    .addTag('item')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api/docs', app, document);

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.app.port!;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
