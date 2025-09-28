import { NestFactory } from '@nestjs/core';
//import { AppModule } from './app.module';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Messages API')
    .setDescription('API for managing messages')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 Application running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `📚 API documentation: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
