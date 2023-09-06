import { InjectModel } from '@nestjs/mongoose';
import { ChatRepository } from '../chat.repository';
import { Chat } from '../entities/chat.entity';
import { Model } from 'mongoose';

export class MongoChatRepository implements ChatRepository {
  constructor(
    @InjectModel(Chat.name) private readonly chatSchema: Model<Chat>
  ) {}

  async createChat(userA: string, userB: string): Promise<Chat> {
    const newChat = await this.chatSchema.create({
      id: 'Hola',
      participants: [userA, userB],
    });

    return newChat;
  }

  async getChats(email: string): Promise<Chat[]> {
    const chats = await this.chatSchema
      .find({ participants: email })
      .populate('messages');

    return chats;
  }
}
