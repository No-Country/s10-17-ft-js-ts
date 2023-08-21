import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

@Schema({ timestamps: false })
export class Genres {
  @Prop()
  @IsString()
  belongsTo: string;

  @Prop()
  @IsArray()
  @Type(() => String)
  genres: string[];
}

export const GenresSchema = SchemaFactory.createForClass(Genres);
