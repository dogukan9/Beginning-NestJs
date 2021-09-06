import { IsString, Matches, MinLength, IsEmail, IsEmpty, IsNotEmpty } from "class-validator"


export class AuthDto {

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "password is too weak" })
    password: string;
}


export class UserDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    surname: string;

    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "password is too weak" })
    password: string;

    @IsEmail()
    email: string;


}