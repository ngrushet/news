import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
async function bootstrap() {
  const port = process.env.APP_PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
  .setTitle('Сервис для авторизации')
  .setDescription('Используется для авторизации доступа к сервису News')
  .setVersion('1.0.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document) 

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  
  await app.listen(port, () => {
    console.log(`Server started on PORT = ${port}`);
  });
}
bootstrap();
