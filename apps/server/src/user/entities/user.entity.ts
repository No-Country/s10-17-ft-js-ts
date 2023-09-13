import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { UserDislike } from './user-dislike.entity';
import { UserCategory } from './user-categorys.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  @IsOptional()
  firstName: string;

  @Prop()
  @IsOptional()
  lastName: string;

  @Prop({
    unique: true,
    required: true,
  })
  @IsOptional()
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  @IsOptional()
  birthdate: Date;

  @Prop({ type: Types.ArraySubdocument, default: [] })
  categorys: UserCategory[];

  @Prop({ default: [] })
  @IsOptional()
  images: string[];

  @Prop({ default: '' })
  @IsOptional()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  @IsOptional()
  matches: User[];

  @Prop()
  @IsOptional()
  likedBy: string[];

  @Prop({ type: Types.ArraySubdocument, default: [] })
  @IsOptional()
  dislikedBy: UserDislike[];

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Conversation' }] })
  // @IsOptional()
  // conversations: Conversation[]

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }] })
  // @IsOptional()
  // notifs: Notification[]

  @Prop()
  @IsOptional()
  gender: string;

  @Prop()
  @IsOptional()
  wantsGender: string;

  @Prop({
    default: false,
  })
  @IsOptional()
  isVerified: boolean;

  @Prop()
  @IsOptional()
  address: string;

  @Prop({
    default: [18, 80],
  })
  @IsOptional()
  ageRange: number[];

  @Prop({
    default: false,
  })
  @IsOptional()
  isProfileConfigured: boolean;

  @Prop()
  @IsOptional()
  lookingFor: string;

  @Prop()
  @IsOptional()
  avatar: string;

  @Prop()
  @IsOptional()
  latitude: number;

  @Prop()
  @IsOptional()
  longitude: number;

  @Prop({
    default: 200,
  })
  @IsOptional()
  zone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
