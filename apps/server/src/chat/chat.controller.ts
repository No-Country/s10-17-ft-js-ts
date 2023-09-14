import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  chats(
    @User('email') email: string,
    @Query('to') emailB: string
  ): Promise<Chat[]> {
    return this.chatService.chats(email, emailB);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @User('email') email: string,
    @Query('to') emailB: string
  ): Promise<Chat> {
    return this.chatService.createChat(email, emailB);
  }
}
