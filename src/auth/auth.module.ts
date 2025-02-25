import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module'; // 사용자 모듈 import
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // 비밀 키를 설정하세요 (환경 변수로 관리하는 것이 좋습니다)
      signOptions: { expiresIn: '60m' }, // Access Token 만료 시간 (60분)
    }),
    UsersModule, // 사용자 서비스 연동
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
