import { IsObject, IsString } from "class-validator"

export class CreatePostDto{
  @IsString()
  postName:string

  @IsString()
  postDescription:string
}