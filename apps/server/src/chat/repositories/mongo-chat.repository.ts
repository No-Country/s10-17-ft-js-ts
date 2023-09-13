import { InjectModel } from '@nestjs/mongoose';
import { ChatRepository } from '../chat.repository';
import { Chat, MessageDocument } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { Model } from 'mongoose';

export class MongoChatRepository implements ChatRepository {
  constructor(
    @InjectModel(Chat.name) private readonly chatSchema: Model<Chat>,
    @InjectModel(Message.name) private readonly messageSchema: Model<Chat>
  ) { }

  async createChat(userA: string, userB: string): Promise<Chat> {
    const newChat = await this.chatSchema.create({
      participants: [userA, userB],
    });

    return newChat;
  }

  async getChat(emailA: string, emailB: string): Promise<Chat> {
    const chat = await this.chatSchema
      .findOne({ participants: [emailA, emailB] })
      .populate('messages');

    return chat!;
  }

  async createMessage(userA: string, userB: string, senderId: string, msg: string): Promise<Chat | null> {
    const chat = await this.chatSchema
    .findOne({ participants: [userA, userB] });
    if(chat) {
      const message = await this.messageSchema.create({
        body: msg,
        senderId: senderId,
        chatId: chat._id
      })
      chat.populate('messages');
      return chat
    }
    return null;
  }
}