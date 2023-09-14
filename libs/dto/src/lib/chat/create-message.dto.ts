import { IsDate, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  receiverId: string

  @IsString()
  body: string;

  @IsString()
  senderId: string;

  @IsDate()
  sendAt: Date;
}
