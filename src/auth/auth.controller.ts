import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserWithoutPassword } from "./entities/user_without_password.entity";
import { JWTAuthGuard } from "./guards/jwt_auth.guard";
import { LocalAuthGuard } from "./guards/local_auth.guard";
import { CurrentUser } from "./param_decorators/current_user.param_decorator";
import { RequiredPipe } from "./pipes/required.pipe";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @ApiBody({ type: LoginDto, description: 'Login with email and password' })
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login(@CurrentUser() user: UserWithoutPassword) {
        return { token: await this.authService.login(user) }
    }

    @ApiBody({ type: RegisterDto, description: 'Register with email, username and password' })
    @HttpCode(200)
    @Post('register')
    async register(
        @Body('email', RequiredPipe) email: string,
        @Body('name', RequiredPipe) name: string,
        @Body('password', RequiredPipe) password: string
    ) {
        return { token: await this.authService.register(email, name, password) }
    }

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @HttpCode(200)
    @Get('verify')
    async verify(
        @CurrentUser() user: UserWithoutPassword,
    ) {
        return { user }
    }

    @ApiBody({ type: ChangePasswordDto, description: 'Change password' })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @HttpCode(200)
    @Post('change-password')
    async change_password(
        @CurrentUser() user: UserWithoutPassword,
        @Body('prev_password', RequiredPipe) prev_pw: string,
        @Body('new_password', RequiredPipe) new_pw: string,
    ) {
        return { user: await this.authService.change_password(user.email, prev_pw, new_pw) }
    }
}
