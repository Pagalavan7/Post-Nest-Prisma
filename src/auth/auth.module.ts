import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';
import 'dotenv/config';
import { JwtService } from './jwt.service';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, BcryptService],
  exports: [JwtService],
})
export class AuthModule {
  constructor() {
    console.log('inside auth module', process.env.JWT_SECRET);
  }
}
