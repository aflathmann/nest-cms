import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { CreateContentBlockDto } from './create-content-block.dto';

export class CreateArticlePageDto {
  @ApiProperty({ description: 'Page number', example: 1 })
  @IsInt()
  pageNumber: number;

  @ApiProperty({
    description: 'Optional page title',
    required: false,
    example: 'Introduction',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Content blocks for this page',
    type: [CreateContentBlockDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContentBlockDto)
  blocks: CreateContentBlockDto[];
}
