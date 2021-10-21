declare module '@firebase/firestore/dist/lite'{
  export declare function collection<T= DocumentData>(firestore: Firestore, path: string, ...pathSegments: string[]): CollectionReference<T>;
}
