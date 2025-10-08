import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  constructor(partial: Partial<PostResponseDto>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  publishedAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  status: string;
}
