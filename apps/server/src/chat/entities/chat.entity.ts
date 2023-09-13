import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray } from 'class-validator';
import { Message } from './message.entity';
import { Type } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  id: string;

  @Prop()
  participants: [string, string];

  @Prop()
  @IsArray()
  @Type(() => Message)
  messages: Message[];
}

const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'chatId',
});

export { ChatSchema };
export type MessageDocument = HydratedDocument<Chat>;
