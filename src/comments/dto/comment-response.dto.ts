import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the comment',
    example: 'comment-123',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the comment',
    example: 'Great article!',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'I really enjoyed this article. Thanks for sharing!',
  })
  content: string;

  @ApiProperty({
    description: 'The owner ID of the comment',
    example: 'user-123',
  })
  ownerId: string; // Wer hat kommentiert

  @ApiProperty({
    description: 'The creation date of the comment',
    example: '2023-03-15T12:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'The last update date of the comment',
    example: '2023-03-15T12:00:00Z',
  })
  updatedAt: string;
}
