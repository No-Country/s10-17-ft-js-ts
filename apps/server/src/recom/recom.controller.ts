import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RecomService } from './recom.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('recom')
@Controller('recom')
export class RecomController {
  constructor(private readonly recomService: RecomService) {}

  @Get('/:many/:id')
  getAll(@Param('many') many: number, @Param('id') id: string) {
    return this.recomService.getRecommendations(many, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:email')
  getSamePines(@User('id') id: string, @Param('email') email: string) {
    return this.recomService.getPines(id, email);
  }
}
