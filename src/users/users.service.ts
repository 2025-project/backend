import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createUser(username: string, password: string): Promise<User> {
    const user = this.userRepository.create({ username, password });
    return await this.userRepository.save(user);
  }
}
