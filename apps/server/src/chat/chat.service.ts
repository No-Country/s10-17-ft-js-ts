import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

  async chats(email: string): Promise<Chat[]> {
    const user = await this.userService.isRegistered(email);

    if (!user)
      throw new BadRequestException(
        `User with email ${email} is not registered`
      );

    const chats = await this.chatRepository.getChats(email);

    return chats;
  }

  async createChat(emailA: string, emailB: string): Promise<Chat> {
    const user = await this.userService.isRegistered(emailA);

    if (!user)
      throw new BadRequestException(
        `User with email ${emailA} is not registered`
      );

    // const isLiked = await this.userService.likedBy();
    // TODO: Check if chat already exist
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
