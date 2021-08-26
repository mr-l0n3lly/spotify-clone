import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CommentType, TrackType } from '../types/services';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() track: TrackType) {
    const { picture, audio } = files;
    return this.trackService.create(track, picture[0], audio[0]);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }
  x;

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() comment: CommentType) {
    return this.trackService.addComment(comment);
  }
}
