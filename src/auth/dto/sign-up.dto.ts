import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'john_doe', description: '유저의 아이디' })
  @IsString()
  @Length(3, 20)
  username: string;

  @ApiProperty({ example: 'securepassword123', description: '유저의 비밀번호' })
  @IsString()
  @Length(6, 50)
  password: string;
}
