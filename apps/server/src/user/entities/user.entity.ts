import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument, SchemaType, Types } from 'mongoose';
import { UserDislike } from './user-dislike.entity';

export type UserDocument = HydratedDocument<User>;

// type UserDislike = {
//   userId: string;
//   times: number;
// };

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

  // @Prop()
  // interests: Interest[];

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

  @Prop()
  @IsOptional()
  ageRange: number[];

  @Prop()
  @IsOptional()
  zone: string;

  @Prop({
    default: false,
  })
  @IsOptional()
  isProfileConfigured: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
