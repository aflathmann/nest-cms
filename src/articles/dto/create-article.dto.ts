import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsIn,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateArticlePageDto } from './create-article-page.dto';

export class CreateArticleDto {
  @ApiProperty({ description: 'Article title', example: 'Breaking News' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Article summary',
    required: false,
    example: 'A brief summary of the article',
  })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({
    description: 'Cover image URL',
    required: false,
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiProperty({
    description: 'Article status',
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  })
  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived';

  @ApiProperty({ description: 'Author ID', example: 'uuid' })
  @IsUUID()
  authorId: string;

  @ApiProperty({
    description: 'Category ID',
    required: false,
    example: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    description: 'Article pages with content blocks',
    type: [CreateArticlePageDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateArticlePageDto)
  pages: CreateArticlePageDto[];
}
