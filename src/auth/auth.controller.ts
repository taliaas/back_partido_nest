import {
  Controller,
  Post,
  Req,
  HttpStatus,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('authentication')
  async authentication(@Req() req: Request) {
    const { name, password } = req.body;
    return this.authService.authentication(name, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request & { user: User }) {
    return req.user;
  }
}
