import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        ...createPostDto,
        author: {
          connect: {
            userId: authorId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.post.findMany({
      where: {
        postId: id,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        postId: id,
      },
      data: {
        ...updatePostDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: {
        postId: id,
      },
    });
  }

  async removeAll() {
    return await this.prisma.post.deleteMany();
  }
}
