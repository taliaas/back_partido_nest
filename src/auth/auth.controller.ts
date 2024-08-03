import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
	@Post('authentication')
	async authentication(@Req() req: Request) {
		const { name, password } = req.body;
		return this.authService.authentication(name, password);
	}
}
