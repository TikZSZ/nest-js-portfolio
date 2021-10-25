import { Type } from "class-transformer";
import { IsNumber, IsOptional,IsString,ValidateNested } from "class-validator";


class EditPost{
  @IsNumber()
  postId:number;
  @IsOptional()
  @IsString()
  postName?:string;
  @IsOptional()
  @IsString()
  postDescription?:string
}

export class EditPostDto{
  @ValidateNested()
  @Type(()=>EditPost)
  data:EditPost
}


