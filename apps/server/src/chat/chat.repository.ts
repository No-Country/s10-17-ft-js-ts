import { Chat } from './entities/chat.entity';

export interface ChatRepository {
  createChat(userA: string, userB: string): Promise<Chat>;
  getChats(email: string): Promise<Chat[]>;
}

export const ChatRepositoryKey = Symbol('ChatRepository');
