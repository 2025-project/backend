// src/user/user.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { LoginResponse } from './dto/login-response.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello from UserResolver!';
  }

  @Mutation(() => User)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.register(username, password);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    return this.userService.login(username, password);
  }

  // refreshToken을 이용해 새로운 accessToken을 발급하는 Mutation
  @Mutation(() => LoginResponse)
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<LoginResponse> {
    try {
      // refresh token 검증 (실제로는 별도의 secret을 사용할 수도 있음)
      const payload = this.userService['jwtService'].verify(refreshToken, {
        secret: 'your_secret_key',
      });
      // payload에서 사용자 정보 추출 후, 새 access token 발급
      const newAccessToken = this.userService['jwtService'].sign(
        { username: payload.username, sub: payload.sub },
        { expiresIn: '15m' },
      );
      // (선택사항) refresh token 로테이션: 새 refresh token 발급
      const newRefreshToken = this.userService['jwtService'].sign(
        { username: payload.username, sub: payload.sub },
        { expiresIn: '7d' },
      );
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
