import { DynamicModule, Module } from "@nestjs/common";
import { FirebaseApp, FirebaseOptions } from "node_modules/firebase/app/dist/app";
import { FIREBASE_APP } from "./constants";
import { firebaseApp } from "./firebaseApp";
import { FireStorageService } from "./fireStorage.service";
import { FireStoreService } from "./fireStore.service";

@Module({})
export class FirebaseModule{
  static register(options: FirebaseApp): DynamicModule {
    return {
      module: FirebaseModule,
      providers: [
        {
          provide: FIREBASE_APP,
          useValue: firebaseApp,
        } as {provide:string,useValue:FirebaseApp},
        FireStorageService,
        FireStoreService
      ],
      exports: [FireStorageService,FireStoreService],
    };
  }
}