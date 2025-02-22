import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input/create-user.input';

@Injectable()
export class UsersService {
  private users = [];

  create(createUserInput: CreateUserInput) {
    const user = {
      id: this.users.length + 1,
      ...createUserInput,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }
}
