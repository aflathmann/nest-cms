import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the category',
    example: 'cat-123',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Technology',
  })
  name: string;

  @ApiProperty({
    description: 'The owner ID of the category',
    example: 'user-123',
  })
  ownerId: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'All about technology',
  })
  description: string;
  @ApiProperty({
    description: 'The creation date of the category',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'The last updated date of the category',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: string;
}
