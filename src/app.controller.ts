/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Request,
  Get,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { LoginUserDto } from './users/models/dto/Login-user.dto';
import { AuthService } from './auth/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('app')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiCreatedResponse({ type: LoginUserDto })
  @ApiBadRequestResponse()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiCreatedResponse({ type: LoginUserDto })
  @ApiBadRequestResponse()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() body: LoginUserDto) {
    return this.authService.login(req.user);
  }
}
