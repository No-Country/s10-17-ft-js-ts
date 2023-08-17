import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entities/item.entity';
import { ItemRepositoryKey } from './item.repository';
import { ItemMongoRepository } from './repositories/item-mongo.repository';
import { ItemProfile } from './item.profile';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [
    ItemService,
    ItemProfile,
    {
      provide: ItemRepositoryKey,
      useClass: ItemMongoRepository,
    },
  ],
})
export class ItemModule {}
