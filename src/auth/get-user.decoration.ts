import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserSchema } from './auth.model';
import { UserDto } from "./dto/auth.dto";


export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): UserDto => {

    const req = ctx.switchToHttp().getRequest();
    return req.user
});