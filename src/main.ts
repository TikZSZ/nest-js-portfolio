import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({credentials:true,origin:process.env.NODE_ENV === 'production'?'https://tikzsz-portfolio.vercel.app':"*",exposedHeaders:'set-cookie'})
  //{origin:process.env.NODE_ENV === 'production'?'https://tikzsz-portfolio.vercel.app':"*"}
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000);
}
bootstrap();