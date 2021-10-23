import { Module } from '@nestjs/common';;
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule,TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Content } from './blog/entities/content.entity';
import { Post } from './blog/entities/post.entity';
import { BlogController } from './blog/blog.controller';

const devConfig:TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Post,Content],
}

const prodConfig:TypeOrmModuleOptions = {
  type: 'postgres',
  host:process.env.PG_HOST,
  port:5432,
  password:process.env.PG_PASSWORD,
  username:process.env.PG_USERNAME,
  database:process.env.PG_DATABASE,
  entities: [Post,Content],
  url:process.env.PG_URL,
}

@Module({
  imports: [
    TypeOrmModule.forRoot(prodConfig),
    BlogModule,
    // FirebaseModule.register(firebaseApp)
  ]
})
export class AppModule {}
