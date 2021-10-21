import { Module } from '@nestjs/common';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';
import { FirebaseModule } from './firebase/firebase.module';
import { firebaseApp } from './firebase/firebaseApp';


@Module({
  imports: [BlogModule,FirebaseModule.register(firebaseApp)],
  controllers: [ BlogController],
  providers: [ BlogService],
})
export class AppModule {}
