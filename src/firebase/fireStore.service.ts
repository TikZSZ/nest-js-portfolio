import { FirebaseApp } from "@firebase/app";
import { Inject, Injectable } from "@nestjs/common";
import {
  getFirestore,
  collection,
  addDoc,
  DocumentData,
  DocumentReference,
  where,
  getDocs,
  query,
  QueryConstraint,
  QuerySnapshot,
  getDoc,
  doc,
  DocumentSnapshot,
  setDoc,
  Firestore,
  deleteDoc,
  updateDoc,
  limit,  
  startAfter,
  startAt,
  orderBy,
  QueryDocumentSnapshot,
  increment
} from "firebase/firestore/lite";
import { FIREBASE_APP } from "./constants";
import { firebaseApp } from "./firebaseApp";

export interface UserDoc{
  name: string;
  email:string;
  age: string;
  country: string;
}

export interface SongDoc{
  uid:string
  display_name:string
  orginal_name:string
  modified_name:string
  genre:string
  comment_count:number
  url:string
}

export interface CommentDoc{
  songId:string,
  comment:string,
  datePosted:string,
  name:string,
  uid:string
}

export interface Comment extends CommentDoc{
  commentId:string
}

export interface Song extends SongDoc{
  docId:string
}

@Injectable()
export class FireStoreService {
  private db:Firestore

  constructor(@Inject(FIREBASE_APP) firebaseApp:FirebaseApp){
    this.db = getFirestore(firebaseApp)
  }

  addDoc<T = DocumentData>(
    collectionName: string,
    data: T
  ): Promise<DocumentReference<T>> {
    const Collection = collection<T>(this.db, collectionName);
    return addDoc<T>(Collection, data as any);
  }
  setDoc<T = DocumentData>(
    collectionName: string,
    data: T,
    ...pathSegment:string[]
  ): Promise<void> {
    const Collection = collection<T>(this.db, collectionName);
    const docRef = doc<T>(Collection,...pathSegment)
    return setDoc<T>(docRef, data as any);
  }
  async getDocs<T = DocumentData>(
    collectionName: string,
    ...queryConstraints: QueryConstraint[]
  ): Promise<QuerySnapshot<T>> {
    const Collection = collection<T>(this.db, collectionName);
    const customQuery = query<T>(Collection, ...queryConstraints);
    return getDocs<T>(customQuery)
  }

  getDoc<T = DocumentData>(
    collectionName: string,
    ...pathSegment:string[]
  ):Promise<DocumentSnapshot<T>>{
    const Collection = collection<T>(this.db, collectionName);
    const docRef = doc<T>(Collection,...pathSegment)
    return getDoc<T>(docRef)
  }
  updateDoc<T = DocumentData>(
    collectionName: string,
    data: T,
    ...pathSegment:string[]
  ): Promise<void> {
    const Collection = collection<T>(this.db, collectionName);
    const docRef = doc<T>(Collection,...pathSegment)
    return updateDoc<T>(docRef, data as any);
  }

  getDocByReference<T>(docRef:DocumentReference<T>){
    return getDoc<T>(docRef)
  }

  deleteDoc(collectionName: string,...pathSegment:string[]){
    const Collection = collection(this.db, collectionName);
    const docRef = doc(Collection,...pathSegment)
    return deleteDoc(docRef)
  }

  setDocByReference<T>(docRef:DocumentReference<T>,data:T){
    return setDoc<T>(docRef, data as any);
  }
}

export const fireStore = new FireStoreService(firebaseApp)

export {DocumentReference,where,limit,startAfter,startAt,DocumentSnapshot,QuerySnapshot,orderBy,QueryDocumentSnapshot,increment}