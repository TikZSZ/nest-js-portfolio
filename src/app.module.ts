import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Content } from './blog/entities/content.entity';
import { Post } from './blog/entities/post.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import session from "cookie-session"
import { AuthMiddleware } from './middlewares/auth.middleware';

const isProd = process.env.NODE_ENV === "production"
const secret =  process.env.SECRET  || "asdf" 
//process.env.SECRET ||


const devConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Post, Content, User],
  synchronize: true,
};

const prodConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: 5432,
  password: process.env.PG_PASSWORD,
  username: process.env.PG_USERNAME,
  database: process.env.PG_DATABASE,
  entities: [Post, Content, User],
  url: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
};

const CookieProdConfig = {
  secure:true,
  httpOnly:true,
  sameSite:'none',
  signed:false,
  maxAge:10000000
}

const CookieDevConfig = {
  secure:false,
  httpOnly:false,
  signed:false
}

@Module({
  imports: [
    TypeOrmModule.forRoot(isProd?prodConfig:devConfig), 
    BlogModule, 
    UserModule,
    JwtModule.register({
      secret:"dc280",
    }),
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session(isProd?CookieProdConfig:CookieDevConfig),
      )
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
