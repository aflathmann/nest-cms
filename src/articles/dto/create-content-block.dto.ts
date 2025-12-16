import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsObject, IsIn } from 'class-validator';
import type { ContentBlockType } from '../content-block.entity';
import type { ContentBlockData } from '../interfaces/content-block-data.interface';

export class CreateContentBlockDto {
  @ApiProperty({ description: 'Display order', example: 1 })
  @IsInt()
  order: number;

  @ApiProperty({
    description: 'Type of content block',
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
    example: 'text',
  })
  @IsIn([
    'text',
    'image',
    'video',
    'audio',
    'gallery',
    'quote',
    'embed',
    'code',
  ])
  @IsString()
  type: ContentBlockType;

  @ApiProperty({
    description: 'Content data (structure depends on type)',
    example: { text: 'Hello world', format: 'markdown' },
  })
  @IsObject()
  content: ContentBlockData;
}
