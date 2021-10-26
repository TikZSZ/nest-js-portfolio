import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService){}
  use(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    console.log(req.cookies);
    if(req.session && req.session.token){
      try{
        //@ts-ignore
        const user = this.jwtService.verify(req.session.token)
        //@ts-ignore
        req.user = user
      }catch(err){
        //@ts-ignore
        req.user = null;
      }
      next()
      return
    }
    //@ts-ignore
    req.user = null
    next();
  }
}
