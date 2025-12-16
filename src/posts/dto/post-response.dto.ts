import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  constructor(partial: Partial<PostResponseDto>) {
    Object.assign(this, partial);
  }
  @ApiProperty({
    description: 'The unique identifier of the post',
    example: 'a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post.',
  })
  content: string;

  @ApiProperty({
    description: 'The unique identifier of the owner of the post',
    example: 'a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78',
  })
  ownerId: string;

  @ApiProperty({
    description: 'The unique identifier of the category of the post',
    example: 'a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78',
  })
  categoryId: string;

  @ApiProperty({
    description: 'The tags associated with the post',
    example: ['nestjs', 'typescript', 'programming'],
  })
  tags: string[];

  @ApiProperty({
    description: 'The date and time when the post was created',
    example: '2024-04-27T12:34:56Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the post was last updated',
    example: '2024-04-27T12:34:56Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The status of the post',
    example: 'published',
  })
  status: string;
}
