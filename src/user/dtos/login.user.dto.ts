import { Type } from "class-transformer";
import { IsEmail, IsString, ValidateNested } from "class-validator";

class LoginUser{
  @IsEmail() 
  email:string;

  @IsString()
  password:string;
}

export class LoginUserDto{
  @ValidateNested()
  @Type(()=>LoginUser)
  data:LoginUser
}