import { Column, PrimaryGeneratedColumn ,OneToOne, Entity} from "typeorm";
import { Content } from "./content.entity";


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

  @Column({type:'time with time zone',default: () => "CURRENT_TIMESTAMP"})
  dateCreated:Date

  @OneToOne(()=>Content,(content)=>content.post)
  content:Content
}