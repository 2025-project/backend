import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'stockdb',
      autoLoadEntities: true, // 엔티티 자동 로드
      synchronize: true, // 개발 환경에서만 true (자동 마이그레이션)],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
