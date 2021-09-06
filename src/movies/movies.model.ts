import * as mongoose from "mongoose";


export const MovieSchema = new mongoose.Schema({

    name: String,

    director: String,


    category: {
        type: String,
        required: true,
    },


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },




})