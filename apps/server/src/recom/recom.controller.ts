import { Controller } from '@nestjs/common';
import { RecomService } from './recom.service';

@Controller('recom')
export class RecomController {
  constructor(private readonly recomService: RecomService) {}
}
