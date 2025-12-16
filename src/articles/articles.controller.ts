import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Articles')
@Controller('articles')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, type: ArticleResponseDto })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, type: [ArticleResponseDto] })
  findAll(
    @Query('status') status?: 'draft' | 'published' | 'archived',
    @Query('authorId') authorId?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    if (status) {
      return this.articlesService.findByStatus(status);
    }
    if (authorId) {
      return this.articlesService.findByAuthor(authorId);
    }
    if (categoryId) {
      return this.articlesService.findByCategory(categoryId);
    }
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiResponse({ status: 200, type: ArticleResponseDto })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an article' })
  @ApiResponse({ status: 200, type: ArticleResponseDto })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an article' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
