// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 회원가입: username과 비밀번호를 받아 새 사용자를 생성합니다.
  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  // 로그인: 사용자를 인증하고 JWT를 발급합니다.
  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    // access token은 짧은 만료시간 (예: 15분)
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    // refresh token은 긴 만료시간 (예: 7일)
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  // 사용자 이름으로 사용자 조회 (JWT Strategy에서 사용)
  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  // refresh token 생성 (여기서는 같은 payload를 사용하지만 만료시간만 길게 설정)
  async generateRefreshToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
