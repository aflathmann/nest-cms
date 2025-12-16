import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create({
      ...createArticleDto,
      pages: createArticleDto.pages.map((page) => ({
        ...page,
        blocks: page.blocks,
      })),
    });

    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['pages', 'pages.blocks', 'author', 'category'],
      order: {
        createdAt: 'DESC',
        pages: {
          pageNumber: 'ASC',
          blocks: {
            order: 'ASC',
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['pages', 'pages.blocks', 'author', 'category'],
      order: {
        pages: {
          pageNumber: 'ASC',
          blocks: {
            order: 'ASC',
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }

    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);

    if (updateArticleDto.pages) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      article.pages = updateArticleDto.pages.map((page) => ({
        ...page,
        blocks: page.blocks,
      })) as any;
    }

    Object.assign(article, updateArticleDto);

    return this.articleRepository.save(article);
  }

  async remove(id: string): Promise<void> {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
  }

  async findByAuthor(ownerId: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { ownerId },
      relations: ['pages', 'pages.blocks', 'category'],
      order: {
        createdAt: 'DESC',
        pages: {
          pageNumber: 'ASC',
          blocks: {
            order: 'ASC',
          },
        },
      },
    });
  }

  async findByCategory(categoryId: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { categoryId },
      relations: ['pages', 'pages.blocks', 'author'],
      order: {
        createdAt: 'DESC',
        pages: {
          pageNumber: 'ASC',
          blocks: {
            order: 'ASC',
          },
        },
      },
    });
  }

  async findByStatus(
    status: 'draft' | 'published' | 'archived',
  ): Promise<Article[]> {
    return this.articleRepository.find({
      where: { status },
      relations: ['pages', 'pages.blocks', 'author', 'category'],
      order: {
        createdAt: 'DESC',
        pages: {
          pageNumber: 'ASC',
          blocks: {
            order: 'ASC',
          },
        },
      },
    });
  }
}
