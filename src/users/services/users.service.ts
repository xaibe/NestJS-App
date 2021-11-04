import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 0,
      name: 'Marius',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(userId: number): User {
    // eslint-disable-next-line prettier/prettier
    return this.users.find((item) => item.id === userId);
  }
  createUser(CreateUserDto: CreateUserDto): User {
    const newUser = {
      id: Date.now(),
      ...CreateUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
}
