import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";

export const CurrentUser = createParamDecorator((_, context: ExecutionContext): Omit<User,"password"> => {
    return context.switchToHttp().getRequest().user
})