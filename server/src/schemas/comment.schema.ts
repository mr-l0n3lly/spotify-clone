import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
