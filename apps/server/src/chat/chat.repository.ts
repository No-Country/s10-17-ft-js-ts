import { Chat } from './entities/chat.entity';

export interface ChatRepository {
  createChat(userA: string, userB: string): Promise<Chat>;
  getChat(emailA: string, emailB: string): Promise<Chat>;
  createMessage(userA: string, userB: string, senderId: string, msg: string): Promise<Chat | null>;
}

export const ChatRepositoryKey = Symbol('ChatRepository');

/*
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Chat } from './entities/chat.entity';
import { ChatRepository, ChatRepositoryKey } from './chat.repository';
import { Message } from './entities/message.entity';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    @Inject(ChatRepositoryKey)
    private readonly chatRepository: ChatRepository,
  ) {}

  async createChat(emailA: string, emailB: string): Promise<Chat> {
    const userA = await this.userService.isRegistered(emailA);
    const userB = await this.userService.isRegistered(emailB);

    if (!userA || !userB) {
      throw new NotFoundException('Both users must be registered');
    }

    // Check if the chat already exists
    const existingChat = await this.chatRepository.findChatByEmails(
      emailA,
      emailB,
    );
    if (existingChat) {
      return existingChat;
    }

    const newChat = await this.chatRepository.createChat(emailA, emailB);

    return newChat;
  }

  async sendMessage(
    chatId: number,
    senderEmail: string,
    content: string,
    socket: Socket, // Pass the socket instance for real-time communication
  ): Promise<Message> {
    const chat = await this.chatRepository.findChatById(chatId);

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    // Ensure that the sender is part of the chat
    if (chat.members.indexOf(senderEmail) === -1) {
      throw new NotFoundException('Sender is not part of this chat');
    }

    const message = await this.chatRepository.createMessage(
      chat,
      senderEmail,
      content,
    );

    // Emit the message to all chat members in real-time
    chat.members.forEach((member) => {
      socket.to(member).emit('newMessage', message);
    });

    return message;
  }

  async getMessages(chatId: number): Promise<Message[]> {
    const chat = await this.chatRepository.findChatById(chatId);

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    // Fetch and return messages for this chat
    const messages = await this.chatRepository.getMessagesForChat(chat);

    return messages;
  }
}
*/