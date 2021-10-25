import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Content } from './blog/entities/content.entity';
import { Post } from './blog/entities/post.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import session from "cookie-session"
import { AuthMiddleware } from './middlewares/auth.middleware';

const isProd = process.env.NODE_ENV === "production"

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

@Module({
  imports: [
    TypeOrmModule.forRoot(isProd?prodConfig:devConfig), 
    BlogModule, 
    UserModule,
    JwtModule.register({
      secret:'asdf',
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret:"asdf",
          secure:isProd?true:false,
          expires:new Date(2022,12),
          httpOnly:false,
          domain:'tikzsz-portfolio.vercel.app'
        }),
      )
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
