import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const result = await this.prisma.user.create({
      data: createUserDto,
    });
    return result;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: id }, { Profile: { userName: id } }],
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        Profile: {
          select: {
            userName: true,
          },
        },
      },
    });
  }

  async getMyPosts(id: string) {
    return this.prisma.user.findMany({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        posts: {
          select: {
            postId: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { userId: id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        userId: id,
      },
    });
  }
}
