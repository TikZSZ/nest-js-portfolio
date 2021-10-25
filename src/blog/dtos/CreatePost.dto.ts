import { Type } from "class-transformer"
import { IsObject, IsString, ValidateNested } from "class-validator"


class Post{
  @IsString()
  postName:string

  @IsString()
  postDescription:string
}

export class CreatePostDto{
  
  @ValidateNested()
  @Type(()=>Post)
  data:Post
}

