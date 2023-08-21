import { CreateItemDto, ItemDto, UpdateItemDto } from '@dto';
import { FilterQuery, Model } from 'mongoose';
import { Item } from '../entities/item.entity';
import { ItemRepository } from '../item.repository';
import { InjectModel } from '@nestjs/mongoose';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuid } from 'uuid';

export class ItemMongoRepository implements ItemRepository {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemDto> {
    const newItem = await this.itemModel.create({
      ...createItemDto,
      id: uuid(),
    });

    return this.mapper.map(newItem, 'ItemDocument', 'ItemDto');
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<void> {
    await this.itemModel.findByIdAndUpdate(id, updateItemDto);
  }

  async findById(id: string): Promise<ItemDto | null> {
    return await this.findOne({ id });
  }

  async findOne(filter: FilterQuery<Item>): Promise<ItemDto | null> {
    const item = await this.itemModel.findOne(filter);

    if (!item) return null;

    return this.mapper.map(item, 'ItemDocument', 'ItemDto');
  }

  async findMany(filter: FilterQuery<Item>): Promise<ItemDto[]> {
    const items = await this.itemModel.find(filter);

    return this.mapper.mapArray(items, 'ItemDocument', 'ItemDto');
  }
}
