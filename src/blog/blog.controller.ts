import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import axios from 'axios';
import {BlogService} from './blog.service'
import {Post as P} from './blog.service'

@Controller('blog')
export class BlogController {
  constructor(private BlogService: BlogService){}
  
  @Post("createPost")
  createPost(@Body() body:{data:{post:P,content:string}}){
    console.log(body);
    
    const {post,content} = body.data
    return this.BlogService.createPost(post,content)
  }

  @Post("createPostMetadata")
  createPostMetadata(@Body() body:{data:{name:string,des:string}}){
    const {name,des} = body.data
    return this.BlogService.createPostMetadata(name,des)
  }

  @Get("/posts")
  getPostsMetadata(){
    return this.BlogService.getPostsMetadata()
  }

  @Post("/post")
  async getPost(@Body() body:{data:{url:string}}){
    console.log(body)
    const {data} = await axios.get(body.data.url)
    return data
  }

  @Post("/editPost")
  editPost(@Body() body:{data:{id:string,content:string,fileName:string}}){
    const {id,content,fileName} = body.data
    return this.BlogService.editPost(id,content,fileName)
  }

  @Post("/editPostMetadata")
  editPostMetadata(@Body() body:{data:P}){
    return this.BlogService.editPostMetadata(body.data)
  }
}
