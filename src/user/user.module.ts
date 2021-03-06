import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {JwtModule} from "@nestjs/jwt"


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:process.env.SECRET || "asdf",
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule{}
