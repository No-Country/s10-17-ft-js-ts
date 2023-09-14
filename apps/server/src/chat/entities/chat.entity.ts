import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  id: string;

  @Prop()
  participants: [string, string];
}

const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'chatId',
});

export { ChatSchema };
export type ChatDocument = HydratedDocument<Chat>;
