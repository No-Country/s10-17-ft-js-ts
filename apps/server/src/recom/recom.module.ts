import { Module } from '@nestjs/common';
import { RecomService } from './recom.service';
import { RecomController } from './recom.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RecomController],
  providers: [RecomService],
})
export class RecomModule {}
