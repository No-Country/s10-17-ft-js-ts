/*import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UserService } from '../user/user.service';
import { Chat } from './entities/chat.entity';
import { ChatRepository, ChatRepositoryKey } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    @Inject(ChatRepositoryKey)
    private readonly chatRepository: ChatRepository
  ) {}

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  async chats(email: string, emailB: string): Promise<Chat[]> {
    const user = await this.userService.isRegistered(email);

    if (!user)
      throw new BadRequestException(
        `User with email ${email} is not registered`
      );

    const chats = await this.chatRepository.getChat(email, emailB);

    return chats;
  }

  async createChat(emailA: string, emailB: string): Promise<Chat> {
    const userA = await this.userService.isRegistered(emailA);
    const userB = await this.userService.isRegistered(emailB);

    if (!userA || !userB) {
      throw new NotFoundException('Both users must be registered');
    }

    // Check if the chat already exists
    const existingChat = await this.chatRepository.getChat(
      emailA,
      emailB,
    );
    if (existingChat) {
      return existingChat;
    }

    const newChat = await this.chatRepository.createChat(emailA, emailB);

    return newChat;
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
*/
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  

  async chats(email: string, emailB: string): Promise<Chat[]> {
    const user = await this.userService.isRegistered(email);

    if (!user)
      throw new BadRequestException(
        `User with email ${email} is not registered`
      );

    const chats = await this.chatRepository.getChat(email, emailB);

    return [chats];
  }

  async createChat(emailA: string, emailB: string): Promise<Chat> {
    const userA = await this.userService.isRegistered(emailA);
    const userB = await this.userService.isRegistered(emailB);

    if (!userA || !userB) {
      throw new NotFoundException('Both users must be registered');
    }

    // Check if the chat already exists
    const existingChat = await this.chatRepository.getChat(
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
    receiverEmail: string,
    senderEmail: string,
    content: string,
    socket: Socket, // Pass the socket instance for real-time communication
  ): Promise<Chat | null> {
    const chat = await this.chatRepository.getChat(senderEmail, receiverEmail);
    
    const user = await this.userService.getOneByEmail(senderEmail);

    if (!chat) {
      throw new NotFoundException(`Chat not found`);
    }

    // Ensure that the sender is part of the chat
    if (!chat.participants.includes(senderEmail)) {
      throw new NotFoundException('Sender is not part of this chat');
    }

    if(user) {
      const message = await this.chatRepository.createMessage(
        senderEmail,
        receiverEmail,
        user._id.toString(),
        content
      );

      // Emit the message to all chat members in real-time
      /*chat.members.forEach((member) => {
        socket.to(member).emit('newMessage', message);
      });*/

      return message;
    }

    return null;
  }

  /*async getMessages(chatId: number): Promise<Message[]> {
    const chat = await this.chatRepository.findChatById(chatId);

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    // Fetch and return messages for this chat
    const messages = await this.chatRepository.getMessagesForChat(chat);

    return messages;
  }*/
}
