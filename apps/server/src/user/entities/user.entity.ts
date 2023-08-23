import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  id: string;

  @Prop()
  birthdate: Date;

  // @Prop()
  // interests: Interest[];

  @Prop()
  @IsOptional()
  images: string[];

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  @IsOptional()
  matches: User[];

  @Prop()
  @IsOptional()
  likedBy: number[];

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Chance' }] })
  // @IsOptional()
  // dislikedBy: Chance[]

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Conversation' }] })
  // @IsOptional()
  // conversations: Conversation[]

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }] })
  // @IsOptional()
  // notifs: Notification[]

  @Prop()
  gender: string;

  @Prop()
  wantsGender: string;

  @Prop({
    default: false,
  })
  @IsOptional()
  isVerified: boolean;

  @Prop()
  address: string;

  @Prop()
  @IsOptional()
  ageRange: number[];

  @Prop()
  @IsOptional()
  zone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
