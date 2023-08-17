import { CreateItemDto, ItemDto, UpdateItemDto } from "@dto";
import { FilterQuery } from "mongoose";
import { Item } from "../entities/item.entity";
import { ItemRepository } from "../item.repository";

export class ItemTestRepository implements ItemRepository {
  create(createItemDto: CreateItemDto): Promise<ItemDto> {
    throw new Error("Method not implemented.");
  }
  update(id: string, updateItemDto: UpdateItemDto): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ItemDto | null> {
    throw new Error("Method not implemented.");
  }
  findOne(filter: FilterQuery<Item>): Promise<ItemDto | null> {
    throw new Error("Method not implemented.");
  }
  findMany(filter: FilterQuery<Item>): Promise<ItemDto[]> {
    throw new Error("Method not implemented.");
  }
}
