import { FirebaseApp } from "firebase/app";
import { getAuth, Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword,UserCredential,signOut,User,onAuthStateChanged,updateProfile,Unsubscribe } from "firebase/auth";
import { firebaseApp } from "./firebaseApp";

class FireAuth {
  public auth:Auth

  constructor(firebaseApp:FirebaseApp){
    this.auth = getAuth(firebaseApp)
  }
  currentUser(){
    return this.auth.currentUser
  }

  isUserLoggedIn(fn?:(user:User|null)=>void):{unSubscribe:Unsubscribe}{
    let unSubscribe = onAuthStateChanged(this.auth,(user)=>{
      fn && fn(user)
    })
    return {unSubscribe}
  }

  signOut(){
    return signOut(this.auth)
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}

export const fireAuth = new FireAuth(firebaseApp)

export {updateProfile}