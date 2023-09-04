import { Module } from '@nestjs/common';
import { RecomService } from './recom.service';
import { RecomController } from './recom.controller';

@Module({
  controllers: [RecomController],
  providers: [RecomService],
})
export class RecomModule {}
