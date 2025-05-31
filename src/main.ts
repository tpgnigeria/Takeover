import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './components/app/app.module';
import { GlobalExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');
      if (!allowedOrigins || allowedOrigins === '*') {
        callback(null, true);
        return;
      }
      const originsArray = allowedOrigins.split(',').map((o) => o.trim());
      if (!origin || originsArray.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Takeover API')
    .setDescription('API documentation for Takeover')
    .setVersion('1.0')
    .addTag('Takeover')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  
  const port = configService.get<number>('PORT') ?? 5000;

  await app.listen(port);
  console.log(`Server is listening on port ${port}`);
}
bootstrap();
