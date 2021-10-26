import { Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { LoginUserDto } from './dtos/login.user.dto';
import { User } from './entities/user.entity';
import {scrypt as _scrypt,randomBytes} from "crypto"
import { promisify } from 'util';
import { toSvg } from "jdenticon";
const scrypt = promisify(_scrypt)


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>){}

  async createUser(data:CreateUserDto['data']){
    const hashedPassword = await this.getPasswordHashWithSalt(data.password)
    const randomString = randomBytes(8).toString('hex')
    const svg = toSvg(randomString,40,{backColor:'#fff'})
    const user = this.userRepo.create({...data,password:hashedPassword,avatar:svg})
    return await this.userRepo.save(user)
  }

  async loginUser(data:LoginUserDto['data']){
    const user = await this.userRepo.findOne({email:data.email},{select:['password','id','isOwner']})
    if(!user) throw new NotFoundException()
    const isCorrectPassword = await this.comparePassword(data.password,user.password)
    if(!isCorrectPassword) throw new UnauthorizedException()
    return user
  }


  private async getPasswordHashWithSalt(password:string){
    const salt = randomBytes(8).toString('hex')
    const hashedPassword = await this.hashPassword(salt,password)
    return `${hashedPassword}.${salt}`
  }

  private async hashPassword(salt:string,password:string){
    const hashedBuffer =await (scrypt(password,salt,8) as Promise<Buffer>)
    return hashedBuffer.toString('hex')
  }

  private async comparePassword(suppliedPassword:string,password:string){
    const [hashedPassword,salt] = password.split('.')
    const suppliedPasswordHash = await this.hashPassword(salt,suppliedPassword)
    return hashedPassword === suppliedPasswordHash
  }
}
