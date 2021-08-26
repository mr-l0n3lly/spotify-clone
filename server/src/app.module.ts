import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/spotify'),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
