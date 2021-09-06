import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { jwtSecret } from './config/default'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        const authJWT = req.headers.authorization;

        if (req.baseUrl !== "auth/login") {
            if (!authJWT) {
                next();
                throw new HttpException("JWT could not found", HttpStatus.FORBIDDEN)
            }
            else {

                try {

                    const decoded = jwt.verify(authJWT.slice(7, authJWT.length), jwtSecret)

                    if (decoded) {
                        req["user"] = decoded.user;
                        next();
                    }
                    else {
                        throw new HttpException("something went wrong", HttpStatus.GATEWAY_TIMEOUT)

                    }
                }
                catch (e) {
                    throw new HttpException(e.message, HttpStatus.UNAUTHORIZED)

                }
            }
        }
        else {

            next();
            return;
        }

    }
}