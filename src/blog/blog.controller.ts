import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import {BlogService} from './blog.service'
import { CreatePostDto } from './dtos/CreatePost.dto';


@Controller('/blog')
export class BlogController {
  constructor(private blogService: BlogService){}
  
  @Post("/createPost")
  createPost(@Body() body:{data:CreatePostDto}){
    return this.blogService.createPost(body.data)
  }

  @Get("/posts")
  getPostsMetadata(){
    return this.blogService.getPosts()
  }

  @Get("/content/:contentId")
  async getContent(@Param('contentId') contentId:number){
    return this.blogService.getContent(contentId)
  }

  @Get("/contents")
  async getContents(){
    return this.blogService.getContents()
  }

  @Post("/editContent")
  editContent(@Body() body:{data:{contentId:number,content:string}}){
    return this.blogService.editContent(body.data)
  }

  @Post("/editPost")
  editPost(@Body() body:{data:{postId:number,postName?:string,postDescription:string}}){
    return this.blogService.editPost(body.data)
  }
}
