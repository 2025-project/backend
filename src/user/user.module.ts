// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // JwtModule은 UserService 내에서 JWT 토큰 생성을 위해 사용됩니다.
    JwtModule.register({
      secret: 'your_secret_key', // 실제 운영 시에는 환경 변수 사용 권장
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
