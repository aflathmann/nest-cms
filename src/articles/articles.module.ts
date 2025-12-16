import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { ArticlePage } from './article-page.entity';
import { ContentBlock } from './content-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticlePage, ContentBlock])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
