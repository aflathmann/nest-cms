import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsIn,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { CreateArticlePageDto } from './create-article-page.dto';

export class UpdateArticleDto {
  @ApiProperty({ description: 'Article title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Article summary', required: false })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({ description: 'Cover image URL', required: false })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiProperty({
    description: 'Article status',
    enum: ['draft', 'published', 'archived'],
    required: false,
  })
  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived';

  @ApiProperty({ description: 'Category ID', required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    description: 'Article pages with content blocks',
    type: [CreateArticlePageDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateArticlePageDto)
  pages?: CreateArticlePageDto[];

  @ApiProperty({ description: 'Published date', required: false })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
