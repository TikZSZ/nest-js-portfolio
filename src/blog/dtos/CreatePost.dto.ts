import { Type } from "class-transformer"
import { IsObject, IsString, ValidateNested,MaxLength } from "class-validator"


class Post{
  @IsString()
  @MaxLength(100)
  postName:string

  @IsString()
  postDescription:string
}

export class CreatePostDto{
  
  @ValidateNested()
  @Type(()=>Post)
  data:Post
}

