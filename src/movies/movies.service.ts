import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoviesDto } from './dto/movies.dto';
import { Response, Request } from 'express';

@Injectable()
export class MoviesService {

    constructor(
        @InjectModel("Movie") private movieModel: Model<MoviesDto>
    ) { }

    async saveMovie(info: MoviesDto, req: any, res: Response) {

        try {

            // const user = await User.findById(req.user.id).select('-password');
            const movie = new this.movieModel({ ...info, user: req.user.id });

            await movie.save();


            return res.json(movie);
        } catch (error) {
            res.status(404).json({ msg: error.message });
        }
    }


    async getMovie(id: string, res: Response) {

        try {

            // const user = await User.findById(req.user.id).select('-password');
            const movie = await this.movieModel.findById(id).populate({ path: "user", select: "-password" })
            //yada  const movie = await this.movieModel.findById(id).populate({ path: "user", select: "email password" })





            return res.json(movie);
        } catch (error) {
            res.status(404).json({ msg: error.message });
        }
    }

}
