import { Controller, Post, Get } from '@nestjs/common';
import { DbseedService } from './dbseed.service';

@Controller('dbseed')
export class DbseedController {
  constructor(private readonly dbseedService: DbseedService) {}

  @Post('saveMovies')
  movieGenres() {
    return this.dbseedService.addMovieGenres();
  }

  @Get('listMovies')
  async getMovieGenres() {
    const belongsTo = 'Películas';
    return this.dbseedService.findByBelongsTo(belongsTo);
  }

  @Post('saveSeries')
  serieGenres() {
    return this.dbseedService.addSerieGenres();
  }

  @Get('listSeries')
  async getSerieGenres() {
    const belongsTo = 'Series';
    return this.dbseedService.findByBelongsTo(belongsTo);
  }

  @Post('saveAnimes')
  animeGenres() {
    return this.dbseedService.addAnimeGenres();
  }

  @Get('listAnimes')
  async getAnimeGenres() {
    const belongsTo = 'Animes';
    return this.dbseedService.findByBelongsTo(belongsTo);
  }

  @Post('saveVideogames')
  videogameGenres() {
    return this.dbseedService.addVideogameGenres();
  }

  @Get('listVideogames')
  async getVideogameGenres() {
    const belongsTo = 'Videojuegos';
    return this.dbseedService.findByBelongsTo(belongsTo);
  }

  @Post('saveMusic')
  musicGenres() {
    return this.dbseedService.addMusicGenres();
  }

  @Get('listMusic')
  async getMusicGenres() {
    const belongsTo = 'Música';
    return this.dbseedService.findByBelongsTo(belongsTo);
  }
}
