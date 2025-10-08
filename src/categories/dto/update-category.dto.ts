import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the category',
    example: 'Technology',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the category',
    example: 'All about technology',
  })
  description: string;
}
