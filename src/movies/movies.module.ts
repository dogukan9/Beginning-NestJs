import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movies.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Movie", schema: MovieSchema }])],

  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule { }
