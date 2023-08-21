import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { ItemProfile } from './item.profile';
import { ItemRepositoryKey } from './item.repository';
import { ItemTestRepository } from './repositories/item-test.repository';
import { AutomapperModule } from '@timonmasberg/automapper-nestjs';
import { pojos } from '@automapper/pojos';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: pojos(),
        }),
      ],
      providers: [
        ItemService,
        ItemProfile,
        {
          provide: ItemRepositoryKey,
          useClass: ItemTestRepository,
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
