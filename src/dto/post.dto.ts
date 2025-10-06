/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  publishedAt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  updatedAt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;
}

export class PostResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  publishedAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  status: string;
}

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty({ type: [String] })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  publishedAt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  updatedAt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;
}
