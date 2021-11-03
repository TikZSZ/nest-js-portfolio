import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserService } from './user.service';
import {JwtService} from "@nestjs/jwt"
import { LoginUserDto } from './dtos/login.user.dto';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,private jwtService: JwtService){}

  @Post('/createUser')
  async createUser(@Body() body:CreateUserDto,@Session() session:any){
    const {id,isOwner,name} = await this.userService.createUser(body.data)
    const token = await this.jwtService.signAsync({id,isOwner,name})
    session.token = token
    return {id,isOwner,name}
  }  

  @Post('/loginUser')
  async loginUser(@Body() body:LoginUserDto,@Session() session:any){
    const {id,isOwner} = await this.userService.loginUser(body.data) 
    const token = await this.jwtService.signAsync({id,isOwner})
    console.log(token);
    
    session.token = token
    return id
  }

  @Get("/currentUser")
  getCurrentUser(@GetUser() user:any|null){
    return user
  }

  @Get("/logoutUser")
  logOutUser(@Session() session:any){
    session.token = null
  }
}
