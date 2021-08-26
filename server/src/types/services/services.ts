import { ObjectId } from 'mongoose';

export interface TrackType {
  readonly name: string;
  readonly artist: string;
  readonly text: string;
}

export interface CommentType {
  readonly username: string;
  readonly text: string;
  readonly trackId: ObjectId;
}

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}
