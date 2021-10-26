import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/AuthGuard';
import {BlogService} from './blog.service'
import { CreatePostDto } from './dtos/CreatePost.dto';
import { EditContentDto } from './dtos/editContent.dto';
import { EditPostDto } from './dtos/editPost.dto';


@Controller('/blog')
export class BlogController {
  constructor(private blogService: BlogService){}
  
  @Post("/createPost")
  @UseGuards(AuthGuard)
  async createPost(@Body() body:CreatePostDto,@GetUser() user:any){
    const post = await this.blogService.createPost(body.data,user)
    return {
      ...post,content:post.content.id
    }
  }


  @Get("/posts")
  getPosts(@Query("isOwner",ParseBoolPipe) isOwner:boolean,@Query('skip') skip:number){
    return this.blogService.getPosts(isOwner,skip)
  }

  @Get("/userPosts")
  @UseGuards(AuthGuard)
  getPostsByUserId(@GetUser() user:any,@Query('skip') skip:number){
    return this.blogService.getPostsByUserId(user,skip)
  }

  @Get("/content/:contentId")
  async getContent(@Param('contentId') contentId:number){
    return this.blogService.getContent(contentId)
  }

  @Get("/contentWithPost/:contentId")
  async getContentWithPost(@Param('contentId') contentId:number){
    return this.blogService.getContentWithPostAndUser(contentId)
  }


  @Get("/contents")
  async getContents(){
    return this.blogService.getContents()
  }

  @Post("/editContent")
  @UseGuards(AuthGuard)
  editContent(@Body() body:EditContentDto,@GetUser() user:any){
    return this.blogService.editContent(body.data,user)
  }

  @Post("/editPost")
  @UseGuards(AuthGuard)
  editPost(@Body() body:EditPostDto,@GetUser() user:any){
    return this.blogService.editPost(body.data,user)
  }
}
