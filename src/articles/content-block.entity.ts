import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArticlePage } from './article-page.entity';
import type { ContentBlockData } from './interfaces/content-block-data.interface';

export type ContentBlockType =
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'gallery'
  | 'quote'
  | 'embed'
  | 'code';

@Entity('content_blocks')
export class ContentBlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => ArticlePage, (page) => page.blocks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pageId' })
  page: ArticlePage;

  @Column()
  pageId: string;

  @Column({ type: 'int' })
  order: number;

  @Column()
  type: ContentBlockType;

  @Column({ type: 'text' })
  content: ContentBlockData;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
