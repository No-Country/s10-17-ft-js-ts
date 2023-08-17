import { Mapper, createMap } from '@automapper/core';
import {
  AutomapperProfile,
  InjectMapper,
} from '@timonmasberg/automapper-nestjs';
import { ItemDto } from '@dto';
import { ItemDocument } from './entities/item.entity';
import { PojosMetadataMap } from '@automapper/pojos';

export class ItemProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.createMetadata();
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, 'ItemDocument', 'ItemDto');
    };
  }

  createMetadata(): void {
    PojosMetadataMap.create<ItemDocument>('ItemDocument', {
      id: String,
      name: String,
      price: Number,
      description: String,
    });

    PojosMetadataMap.create<ItemDto>('ItemDto', {
      id: String,
      name: String,
      price: Number,
      description: String,
    });
  }
}
