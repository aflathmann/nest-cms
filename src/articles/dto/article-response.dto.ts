import { ApiProperty } from '@nestjs/swagger';
import type { ContentBlockType } from '../content-block.entity';
import type { ContentBlockData } from '../interfaces/content-block-data.interface';

export class ContentBlockResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  order: number;

  @ApiProperty({
    enum: [
      'text',
      'image',
      'video',
      'audio',
      'gallery',
      'quote',
      'embed',
      'code',
    ],
  })
  type: ContentBlockType;

  @ApiProperty()
  content: ContentBlockData;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ArticlePageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ type: [ContentBlockResponseDto] })
  blocks: ContentBlockResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ArticleResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  summary?: string;

  @ApiProperty({ required: false })
  coverImageUrl?: string;

  @ApiProperty({ enum: ['draft', 'published', 'archived'] })
  status: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty({ required: false })
  categoryId?: string;

  @ApiProperty({ type: [ArticlePageResponseDto] })
  pages: ArticlePageResponseDto[];

  @ApiProperty({ required: false })
  publishedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
