import { CreateItemDto, ItemDto, UpdateItemDto } from '@dto';
import { FilterQuery } from 'mongoose';
import { Item } from './entities/item.entity';


export interface ItemRepository {
  create(createItemDto: CreateItemDto): Promise<ItemDto>;
  update(id: string, updateItemDto: UpdateItemDto): Promise<void>;
  findById(id: string): Promise<ItemDto | null>;
  findOne(filter: FilterQuery<Item>): Promise<ItemDto | null>;
  findMany(filter: FilterQuery<Item>): Promise<ItemDto[]>;
}

export const ItemRepositoryKey = Symbol("ItemRepository");
