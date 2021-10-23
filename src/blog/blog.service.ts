import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostRepo } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Content as ContentRepo } from './entities/content.entity';


@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(PostRepo) private postRepo: Repository<PostRepo>,
    @InjectRepository(ContentRepo) private contentRepo: Repository<ContentRepo>,
  ) {}

  async createPost(data: { postName: string; postDescription: string }) {
    console.log(data);
    
    const content = this.contentRepo.create({
      content: 'Hello, World!',
    });

    await this.contentRepo.save(content);
    const post = this.postRepo.create({
      name: data.postName,
      description: data.postDescription,
      content:content
    });

    return await this.postRepo.save(post);
  }

  async editContent(data: { content: string,contentId: number } ) {
    const content = await this.contentRepo.update({id:data.contentId},{
      content:data.content
    })
    return content
  }

  async editPost(data: { postId:number, postName?: string; postDescription?: string }){
    let post
    if(data.postName && data.postDescription){
      post = await this.postRepo.update({id:data.postId},{
        name:data.postName,
        description:data.postDescription
      })
    }else if(data.postName){
      post = await this.postRepo.update({id:data.postId},{
        name:data.postName,
      })
    }else{
      post = await this.postRepo.update({id:data.postId},{
        description:data.postDescription,
      })
    }
    
    return post
  }
  
  async getPosts(isOwner:boolean){
    return this.postRepo.find({order:{
      id:'DESC'
    },take:10,loadRelationIds:true,where:{isOwner}})
  }

  async getPostsPaginated(skip:number){
    return this.postRepo.find({order:{dateCreated:'ASC'},skip,take:10})
  }

  async getContent(contentId:number){
    return this.contentRepo.findOne(contentId)
  }

  async getContents(){
    return this.contentRepo.find()
  }
}
