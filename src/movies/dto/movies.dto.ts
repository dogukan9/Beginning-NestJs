import { IsString, IsNotEmpty, } from "class-validator"

import * as mongoose from "mongoose";
export class MoviesDto {

    @IsString()
    @IsNotEmpty()
    name: string;


    @IsString()
    @IsNotEmpty()
    category: string;


    @IsString()
    @IsNotEmpty()
    director: string;

    user: mongoose.Schema.Types.ObjectId;


}