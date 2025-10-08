import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  ownerId: string; // Wer hat kommentiert

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
