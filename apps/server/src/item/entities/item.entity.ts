import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
