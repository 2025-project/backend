import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'; // 비밀번호 해싱을 위해 사용

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 사용자 비밀번호 확인
  async validateUser(name: string, pass: string): Promise<any> {
    // 실제로는 DB에서 사용자를 조회하고 비밀번호 비교
    const user = { name: 'user', password: 'password' }; // 예시
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  // JWT 토큰 생성
  async login(user: any) {
    const payload = { username: user.name, sub: user.id }; // 사용자 정보
    const accessToken = this.jwtService.sign(payload); // Access Token 생성
    const refreshToken = this.jwtService.sign(payload, {
      secret: 'yourSecretKey', // Refresh Token의 secret은 다르게 설정할 수 있습니다.
      expiresIn: '7d', // Refresh Token은 더 긴 기간 동안 유효합니다.
    });

    return { accessToken, refreshToken };
  }
}
