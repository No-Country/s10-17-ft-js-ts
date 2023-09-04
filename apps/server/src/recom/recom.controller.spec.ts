import { Test, TestingModule } from '@nestjs/testing';
import { RecomController } from './recom.controller';
import { RecomService } from './recom.service';

describe('RecomController', () => {
  let controller: RecomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecomController],
      providers: [RecomService],
    }).compile();

    controller = module.get<RecomController>(RecomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
