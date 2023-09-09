import { Controller, Get, Param } from '@nestjs/common';
import { RecomService } from './recom.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('recom')
@Controller('recom')
export class RecomController {
  constructor(private readonly recomService: RecomService) {}

  @Get('/:many/:id')
  getAll(@Param('many') many: number, @Param('id') id: string) {
    return this.recomService.getRecommendations(many, id);
  }
}
