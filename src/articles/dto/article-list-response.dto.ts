import { ApiProperty } from '@nestjs/swagger';
import { ArticleResponseDto } from './article-response.dto';

export class ArticleListResponseDto {
  @ApiProperty({ type: [ArticleResponseDto] })
  articles: ArticleResponseDto[];

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}
