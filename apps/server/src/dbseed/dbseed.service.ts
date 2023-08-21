import { Injectable } from '@nestjs/common';
import { Genres } from '@dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GenresService } from './entities/genres.service';

@Injectable()
export class DbseedService {
  constructor(
    private readonly httpService: HttpService,
    private readonly genresService: GenresService
  ) {}

  async addMovieGenres(): Promise<Genres> {
    const api = 'https://api.themoviedb.org/3/genre/movie/list';
    const apiKey = 'a0e1f02b394263b862d094dbc96d422c';
    const { data } = await firstValueFrom(
      this.httpService
        .get<{ genres: { name: string }[] }>(
          `${api}?language=es&api_key=${apiKey}`
        )
        .pipe(
          catchError((error) => {
            console.log(error.response.data);
            throw 'An error happened retrieving movies genres!';
          })
        )
    );
    const transformedData = data.genres.map((genre) => genre.name);
    const genres = { belongsTo: 'Películas', genres: transformedData };
    try {
      await this.genresService.saveGenres(genres);
      console.log('Genres saved successfully');
    } catch (error) {
      console.log('Error saving genres', error);
    }
    return genres;
  }

  async findByBelongsTo(category: string): Promise<Genres | null> {
    return this.genresService.findByBelongsTo(category);
  }
}
