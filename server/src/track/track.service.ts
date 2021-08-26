import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { CommentType, FileType, TrackType } from '../types/services';
import { FileService } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(data: TrackType, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    return await this.trackModel.create({
      ...data,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
  }

  async getAll(): Promise<Track[]> {
    return this.trackModel.find();
  }

  async getOne(id: ObjectId): Promise<Track> {
    return this.trackModel.findById(id).populate('comments');
  }

  async delete(id: ObjectId): Promise<unknown> {
    return this.trackModel.findByIdAndDelete(id);
  }

  async addComment(comment: CommentType): Promise<Comment> {
    const track = await this.trackModel.findById(comment.trackId);
    const com = await this.commentModel.create({ ...comment });
    track.comments.push(com._id);
    await track.save();
    return com;
  }
}
