import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule, } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express"
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy',1)
  app.enableCors({credentials:true,origin:process.env.NODE_ENV === 'production'?'https://tikzsz-portfolio.vercel.app':"http://localhost:8080",methods:"*"})
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

// app.enableCors({credentials:true,origin:process.env.NODE_ENV === 'production'?'https://tikzsz-portfolio.vercel.app':"*",exposedHeaders:'set-cookie',allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,Set-Cookie',})
//{origin:process.env.NODE_ENV === 'production'?'https://tikzsz-portfolio.vercel.app':"*"}