import { Injectable } from "@nestjs/common";
import { Column, PrimaryGeneratedColumn ,OneToOne, Entity, JoinColumn} from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Content{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  content:string

  @OneToOne(()=>Post,(post)=>post.content)
  @JoinColumn()
  post:Post

  @Column()
  userId:number
}