import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await this.bcryptService.hashPassword(password);
    createUserDto = { ...createUserDto, password: hashedPassword };
    return this.userService.registerUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserById(
      loginUserDto.email || loginUserDto.userName,
    );
    console.log('user retrived from user service.. in auth is.. ', user);
    if (
      await this.bcryptService.comparePassword(
        loginUserDto.password,
        user.password,
      )
    ) {
      const payload = {
        email: user.email,
        userName: user.Profile?.userName || null,
      };
      return await this.jwtService.sign(payload);
    }
  }
}
