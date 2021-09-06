import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({

    name: String,

    surname: String,

    username: { type: String, unique: true },

    password: String,

    email: { type: String, required: true },

})