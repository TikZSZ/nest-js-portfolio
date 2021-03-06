import { Post } from "src/blog/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

const isProd = process.env.NODE_ENV === "production";


@Entity()
export class User{
  
  @PrimaryGeneratedColumn()
  id:number;

  @Column({length:40})
  name:string;

  @Column({nullable:true})
  avatar:string

  @Column({select:false,unique:isProd})
  email:string

  @Column({select:false})
  password:string

  @Column({default:false,select:false})
  isOwner:boolean

  @OneToMany(()=>Post,(post)=>post.user,{nullable:true})
  posts:Post[]
}