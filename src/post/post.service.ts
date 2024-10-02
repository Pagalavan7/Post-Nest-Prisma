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
    return await this.prisma.post.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.post.findMany({
      where: {
        postId: id,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { categoryName, categoryId, ...updatepostdata } = updatePostDto;
    console.log(categoryName, categoryId);
    let categoryData = undefined;

    if (categoryId) {
      // Connect to an existing category by ID
      categoryData = {
        connect: {
          id: categoryId,
        },
      };
    } else if (categoryName) {
      // Either connect to an existing category by name or create a new one
      categoryData = {
        connectOrCreate: {
          where: { categoryName: categoryName },
          create: { categoryName: categoryName },
        },
      };
    }
    return await this.prisma.post.update({
      where: {
        postId: id,
      },
      data: {
        ...updatepostdata,
        category: categoryData,
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
