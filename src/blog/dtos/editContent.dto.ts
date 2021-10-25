import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator"

class EditContent{
  @IsNumber()
  contentId:number;

  @IsString()
  content:string
}

export class EditContentDto{
  @ValidateNested()
  @Type(()=>EditContent)
  data:EditContent;
}