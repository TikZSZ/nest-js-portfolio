import { Injectable } from '@nestjs/common';
import { FireStoreService,orderBy } from 'src/firebase/fireStore.service';
import {FireStorageService,} from "../firebase/fireStorage.service"
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL } from '@firebase/storage';

export interface Post{
  id:string,
  name:string,
  des:string,
  url:string,
  fileName:string,
  isOwner:boolean,
  dateCreated:Date
}

@Injectable()
export class BlogService {
  constructor(private fireStorage: FireStorageService,private fireStore:FireStoreService){}

  async createPost(post:Post,content:string){
    const buffer = Buffer.from(content)
    const fileName = `${post.fileName}.html`
    const task = await this.fireStorage.uploadBytes(fileName,buffer)
    const url = await getDownloadURL(task.ref)
    return this.editPostMetadata({...post,url:url})
  }

  async createPostMetadata(name:string,des:string){
    const id = uuidv4()
    const fileName = `blogs/${id}.html`
    const post = {
      id:id,
      name:name,
      des:des,
      url:'',
      fileName,
      isOwner:false,
      dateCreated:new Date()  
    }
    await this.fireStore.setDoc<Post>('posts',post,id)
    return post
  }

  async getPostsMetadata():Promise<any>{
    const posts = await this.fireStore.getDocs<Post>("posts",orderBy("dateCreated","desc"))
    return posts.docs.map((doc)=>{
      return doc.data()
    })
  }

  async editPost(id:string,content:string,fileName:string){
    const buffer = Buffer.from(content)
    const task = await this.fireStorage.uploadBytes(`blogs/${fileName}`,buffer)
    const url = await this.fireStorage.getDownloadURLWithRef(task.ref)
    // return this.editPostMetadata(id,{url})
    return url
  }

  async editPostMetadata(data:Post){
    await this.fireStore.setDoc("posts",data,data.id)
    return data.url
  }
}
