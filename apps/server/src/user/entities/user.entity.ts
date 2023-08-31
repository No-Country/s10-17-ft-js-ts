import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  birthdate: Date;

  // @Prop()
  // interests: Interest[];

  @Prop({ default: [] })
  @IsOptional()
  images: string[];

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  @IsOptional()
  matches: User[];

  @Prop()
  @IsOptional()
  likedBy: string[];

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
