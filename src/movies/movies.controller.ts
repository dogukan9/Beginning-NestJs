import { Body, Controller, Post, Res, Req, Get, Param } from '@nestjs/common';
import { MoviesDto } from './dto/movies.dto';
import { Response, Request } from 'express';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private movieService: MoviesService) { }


    @Post("/saveMovie")
    saveMovie(@Body() body: MoviesDto, @Req() req: Request, @Res() res: Response) {


        this.movieService.saveMovie(body, req, res);


    }

    @Get("/getMovie/:id")
    getMovie(@Param("id") id: string, @Res() res: Response) {

        return this.movieService.getMovie(id, res);
    }
}
