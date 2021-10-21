import { Inject, Injectable } from '@nestjs/common';
import { FirebaseApp } from '@firebase/app';
import { firebaseApp } from './firebaseApp';
import {
  FirebaseStorage,
  getStorage,
  uploadBytes,
  ref,
  uploadBytesResumable,
  listAll,
  list,
  ListOptions,
  getDownloadURL,
  StorageReference,
  deleteObject,
  UploadResult,
  UploadTask,
} from 'firebase/storage';
import { FIREBASE_APP } from './constants';

@Injectable()
export class FireStorageService {
  private storage: FirebaseStorage;

  constructor(@Inject(FIREBASE_APP) firebaseApp: FirebaseApp) {
    this.storage = getStorage(firebaseApp);
  }

  uploadBytes(pathWithId: string, data: Blob | Uint8Array | ArrayBuffer) {
    const storageRef = ref(this.storage, pathWithId);
    return uploadBytes(storageRef, data);
  }
  uploadBytesResumable(
    pathWithId: string,
    data: Blob | Uint8Array | ArrayBuffer,
  ) {
    const storageRef = ref(this.storage, pathWithId);
    return uploadBytesResumable(storageRef, data);
  }
  listAll(pathWithId: string) {
    const storageRef = ref(this.storage, pathWithId);
    return listAll(storageRef);
  }
  list(pathWithId: string, listOptions?: ListOptions) {
    const storageRef = ref(this.storage, pathWithId);
    return list(storageRef, listOptions);
  }
  getDownloadURL(pathWithId: string) {
    const storageRef = ref(this.storage, pathWithId);
    return getDownloadURL(storageRef);
  }
  getDownloadURLWithRef(storageRef: StorageReference) {
    return getDownloadURL(storageRef);
  }
  deleteObject(pathWithId: string) {
    const storageRef = ref(this.storage, pathWithId);
    return deleteObject(storageRef);
  }
}

// export const fireStorage = new FireStorage(firebaseApp);

export { UploadResult, UploadTask };
