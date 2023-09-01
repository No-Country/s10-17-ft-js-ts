import { Test, TestingModule } from '@nestjs/testing';
import { DbseedController } from './dbseed.controller';
import { DbseedService } from './dbseed.service';

describe('DbseedController', () => {
  let controller: DbseedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbseedController],
      providers: [DbseedService],
    }).compile();

    controller = module.get<DbseedController>(DbseedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
