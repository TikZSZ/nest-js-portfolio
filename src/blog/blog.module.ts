import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Content } from './entities/content.entity';
import { Post } from './entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Post,Content])],
  providers:[BlogService],
  controllers:[BlogController]
})
export class BlogModule {}
