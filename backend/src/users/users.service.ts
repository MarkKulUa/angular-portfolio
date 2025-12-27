import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findOne(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((user) => user.id === id));
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: Date.now().toString(),
      ...createUserDto,
      createdAt: new Date(),
    };
    this.users.push(user);
    return Promise.resolve(user);
  }
}
