import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genres } from './genres.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genres.name) private readonly genreModel: Model<Genres>
  ) {}

  async saveGenres(genres: Genres): Promise<Genres> {
    return this.genreModel.create(genres);
  }

  async findByBelongsTo(belongsTo: string): Promise<Genres | null> {
    return this.genreModel.findOne({ belongsTo }).exec();
  }
}
