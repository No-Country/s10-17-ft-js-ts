import { CreateItemDto, ItemDto, UpdateItemDto } from '@dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository, ItemRepositoryKey } from './item.repository';

@Injectable()
export class ItemService {
  constructor(
    @Inject(ItemRepositoryKey)
    private readonly itemRepository: ItemRepository
  ) {}

  /**
   * @param createItemDto - item to be created
   * @returns new created item
   */
  async create(createItemDto: CreateItemDto): Promise<ItemDto> {
    return this.itemRepository.create(createItemDto);
  }

  /**
   * @returns all items in database
   */
  findAll(): Promise<ItemDto[]> {
    return this.itemRepository.findMany({});
  }

  async findOne(id: string): Promise<ItemDto> {
    const item = await this.itemRepository.findById(id);

    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return item;
  }

  /**
   * @param id - item id
   * @returns item with id 'id', otherwise throws NotFoundException
   */
  async findById(id: string): Promise<ItemDto> {
    const item = await this.itemRepository.findById(id);

    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return item;
  }

  /**
   * @param id - item id
   * @param updateItemDto - fields to be Updated
   */
  async update(id: string, updateItemDto: UpdateItemDto): Promise<void> {
    await this.itemRepository.update(id, updateItemDto);
  }
}
