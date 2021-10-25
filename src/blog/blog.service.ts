import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostRepo } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Content as ContentRepo } from './entities/content.entity';

interface UserToken {
  id: number;
  isOwner: boolean;
}

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(PostRepo) private postRepo: Repository<PostRepo>,
    @InjectRepository(ContentRepo) private contentRepo: Repository<ContentRepo>,
  ) {}

  async createPost(
    data: { postName: string; postDescription: string },
    user: UserToken,
  ) {
    const content = this.contentRepo.create({
      content: 'Hello, World!',
      userId:user.id
    });
    await this.contentRepo.save(content);

    const post = this.postRepo.create({
      name: data.postName,
      description: data.postDescription,
      content: content,
      isOwner: user.isOwner,
      user: {
        id: user.id,
      },
      contentId:content.id
    });
    return await this.postRepo.save(post);
  }

  async editContent(
    data: { content: string; contentId: number },
    user: UserToken,
  ) {
    const content = await this.contentRepo.findOne(data.contentId)

    if (!content) throw new NotFoundException();
    console.log(content, user);

    if (content.userId !== user.id) throw new UnauthorizedException();
    content.content = data.content;
    this.contentRepo.save(content);
    return true;
  }

  async editPost(
    data: { postId: number; postName?: string; postDescription?: string },
    user: UserToken,
  ) {
    const post = await this.postRepo.findOne(data.postId, {
      loadRelationIds: true,
    });
    if (!post) throw new NotFoundException();
    console.log(post, user);
    //@ts-ignore
    if (post.user !== user.id) throw new UnauthorizedException();
    post.name = data.postName ? data.postName : post.name;
    post.description = data.postDescription
      ? data.postDescription
      : post.description;
    await this.postRepo.save(post);
    return post;
  }

  async getPosts(isOwner: boolean,skip:number=0) {
    return (await this.postRepo.find({
      order: {
        id: 'DESC',
      },
      skip,
      take: 10,
      relations: ['user'],
      where: { isOwner },
    }));
  }

  async getPostsByUserId(user: UserToken,skip:number=0) {
    return this.postRepo.find({
      order: {
        id: 'DESC',
      },
      skip,
      take: 10,
      loadRelationIds: true,
      where: { user: { id: user.id } },
    });
  }

  async getContent(contentId: number) {
    return this.contentRepo.findOne(contentId);
  }

  async getContents() {
    return this.contentRepo.find({ order: { id: 'ASC' }, take: 10 });
  }

  async getContentWithPostAndUser(contentId: number){
    return this.contentRepo
      .createQueryBuilder("content")
      .innerJoinAndSelect("content.post","post")
      .innerJoinAndSelect("post.user","user")
      .where("content.id = :contentId",{contentId})
      .getOne()
  }
}
