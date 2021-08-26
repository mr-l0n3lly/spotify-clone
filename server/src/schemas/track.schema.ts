import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

export type TrackDocument = Track & Document;

export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  track: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
