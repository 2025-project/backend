import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') // ✅ Swagger 카테고리 추가
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ✅ 회원가입 API (POST /auth/register)
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @UsePipes(new ValidationPipe())
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        password: { type: 'string', example: 'securepassword123' },
      },
    },
  }) // ✅ Swagger 요청 본문 템플릿
  async register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // ✅ 로그인 API (POST /auth/login)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        password: { type: 'string', example: 'securepassword123' },
      },
    },
  }) // ✅ Swagger 요청 본문 템플릿
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
