import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { ContentBlock } from './content-block.entity';

@Entity('article_pages')
export class ArticlePage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Article, (article) => article.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column()
  articleId: string;

  @Column({ type: 'int' })
  pageNumber: number;

  @Column({ nullable: true })
  title: string;

  @OneToMany(() => ContentBlock, (block) => block.page, { cascade: true })
  blocks: ContentBlock[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
