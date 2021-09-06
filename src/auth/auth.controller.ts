import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from './dto/auth.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/saveUser")
    saveUser(@Body() infos: UserDto, @Res() res: Response) {

        return this.authService.saveUser(infos, res);



    }

    @Get("/getAllUsers")
    getUsers() {

        return this.authService.getUsers();



    }

    @Post("/login")
    login(@Body() info: AuthDto, @Res() res: Response) {

        return this.authService.login(info, res);
    }

    @Get("/user/:id")
    getUserById(@Param("id") id: string, @Res() res: Response) {
        return this.authService.getUserById(id, res);

    }


}
