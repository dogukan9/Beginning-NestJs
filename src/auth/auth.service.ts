import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto, UserDto } from './dto/auth.dto';
import { UserSchema } from "./auth.model"
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import { jwtSecret } from "../config/default"


@Injectable()
export class AuthService {

    constructor(
        @InjectModel("User") private userMongo: Model<UserDto>,

    ) { }

    async saveUser(info: UserDto, res: Response) {

        const { name, surname, username, password, email } = info;

        let user = await this.userMongo.find({ email });

        console.log(user)

        if (user.length > 0) {

            throw new ConflictException("This user is already exist")
        }

        else {

            const newUser = new this.userMongo(info);

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            await newUser.save();

            //return Res.json(newUser);

            return res.json({ message: "successfull" })



        }




    }

    async getUsers() {

        return this.userMongo.find();
    }

    async login(info: AuthDto, res: Response) {

        const { username, password } = info;
        const user = await this.userMongo.findOne({ username });
        const isMatch = await bcrypt.compare(password, user.password)

        if (!user) {
            throw new ConflictException("There is no user with that inputs")
        }
        else if (!isMatch) {
            return res.status(400).json({ message: "Password doesn't match" });
        }

        else {
            try {
                const payload = {

                    user: {
                        id: user.id,
                        username: user.username,
                    }
                }
                jwt.sign(payload, jwtSecret,
                    { expiresIn: 36000 },
                    (err, token) => {
                        if (err) {
                            throw err;
                        }
                        return res.json({ token })
                    })





            }
            catch (err) {
                res.status(404).json({ msg: 'something is wrong' });
            }
        }


    }

    async getUserById(id: string, res: Response) {

        try {
            const user = await this.userMongo.findById(id).select("-password");
            console.log(user)

            if (!user) {
                return res.json({ message: "There is not user with that id" })
            }

            return res.json(user);

        }
        catch (err) {

            res.status(404).json({ msg: 'something is wrong' });
        }
    }
}
