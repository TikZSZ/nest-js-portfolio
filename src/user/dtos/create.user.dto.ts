import { Type } from "class-transformer";
import { IsEmail, IsOptional,IsString, ValidateNested,Min, Max,MaxLength,MinLength} from "class-validator";


class CreateUser{
  @IsString()
  @MaxLength(60)
  name:string

  @IsEmail()
  @MaxLength(60)
  email:string

  @MinLength(8)
  @MaxLength(40)
  @IsString()
  password:string

  @IsOptional()
  @IsString()
  avatar:string
}

export class CreateUserDto{
  @ValidateNested()
  @Type(()=>CreateUser)
  data:CreateUser
}