import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class UserPostsFilterDTO {
  @IsString()
  @IsOptional()
  category: string;
}
