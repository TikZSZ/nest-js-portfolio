import { User } from "src/user/entities/user.entity";
import { Column, PrimaryGeneratedColumn ,OneToOne, Entity, ManyToOne, JoinColumn} from "typeorm";
import { Content } from "./content.entity";

const isProd = process.env.NODE_ENV === "production";

@Entity()
export class Post{
  @PrimaryGeneratedColumn()
  id:number

  @Column({type:"varchar"})
  name:string

  @Column({type:"varchar"})
  description:string

  @Column({type:"boolean",default:false})
  isOwner:boolean

  @Column({type:isProd?'timestamp with time zone':'datetime',default: () => "CURRENT_TIMESTAMP"})
  dateCreated:Date

  @OneToOne(()=>Content,(content)=>content.post)
  content:Content

  @ManyToOne(()=>User,(user)=>user.posts)
  @JoinColumn({ name: "userId" })
  user:User

  @Column()
  contentId:number
}