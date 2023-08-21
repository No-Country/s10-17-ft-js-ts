import { Controller, Post, Get } from '@nestjs/common';
import { DbseedService } from './dbseed.service';

@Controller('dbseed')
export class DbseedController {
  constructor(private readonly dbseedService: DbseedService) {}

  @Post('save')
  movieGenres() {
    return this.dbseedService.addMovieGenres();
  }

  @Get('list')
  async getMovieGenres() {
    const belongsTo = 'Películas';
    return this.dbseedService.findByBelongsTo(belongsTo);
  }
}
