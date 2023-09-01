import { Module } from '@nestjs/common';
import { DbseedService } from './dbseed.service';
import { DbseedController } from './dbseed.controller';
import { HttpModule } from '@nestjs/axios';
import { GenresService } from './entities/genres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genres, GenresSchema } from './entities/genres.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genres.name, schema: GenresSchema }]),
    HttpModule,
  ],
  controllers: [DbseedController],
  providers: [DbseedService, GenresService],
})
export class DbseedModule {}
