import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRepository } from '../chat.repository';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';

export class MongoChatRepository implements ChatRepository {
  constructor(
    @InjectModel(Chat.name) private readonly chatSchema: Model<Chat>,
    @InjectModel(Message.name) private readonly messageSchema: Model<Message>
  ) {}

  async createChat(userA: string, userB: string): Promise<Chat> {
    const newChat = await this.chatSchema.create({
      participants: [userA, userB],
    });

    return newChat;
  }

  async getChat(emailA: string, emailB: string): Promise<Chat | null> {
    const chat = await this.chatSchema
      .findOne({ participants: [emailA, emailB] })
      .populate('messages');
    return chat;
  }

  async createMessage(
    userA: string,
    userB: string,
    senderId: string,
    msg: string
  ): Promise<Message | null> {
    const chat = await this.chatSchema.findOne({
      participants: [userA, userB],
    });
    if (chat) {
      const message = await this.messageSchema.create({
        body: msg,
        senderId: senderId,
        chatId: chat._id,
      });
      return message;
    }
    return null;
  }

  async getChatsFromOneUser(email: string): Promise<Chat[] | null> {
    const chats = await this.chatSchema.find({ participants: email }).exec();
    return chats;
  }
}
