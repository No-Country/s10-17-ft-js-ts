import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.entity';
import { Message, MessageSchema } from './entities/message.entity';
import { ChatController } from './chat.controller';
import { ChatRepositoryKey } from './chat.repository';
import { MongoChatRepository } from './repositories/mongo-chat.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UserModule,
  ],
  providers: [
    ChatGateway,
    ChatService,
    {
      provide: ChatRepositoryKey,
      useClass: MongoChatRepository,
    },
  ],
  controllers: [ChatController],
})
export class ChatModule {}
