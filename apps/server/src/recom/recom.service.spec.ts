import { Test, TestingModule } from '@nestjs/testing';
import { RecomService } from './recom.service';

describe('RecomService', () => {
  let service: RecomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecomService],
    }).compile();

    service = module.get<RecomService>(RecomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
