import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    const token = await this.authService.login(loginUserDto);
    if (token) {
      return response.json({ message: 'User sign in successful', token });
    } else {
      return response.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
