import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('all')
  getusers(): User[] {
    return this.usersService.findAll();
  }
  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.usersService.findById(Number(id));
  }

  @Post('create')
  create(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
