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
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './users/models/dto/Login-user.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiCreatedResponse({ type: LoginUserDto })
  @ApiBadRequestResponse()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() body: LoginUserDto) {
    return req.user;
  }
}
