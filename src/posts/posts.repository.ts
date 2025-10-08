import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

@Injectable()
export class PostsRepository {
  private messageFile = 'posts.json';

  private async readMessagesFile(): Promise<PostResponseDto[]> {
    try {
      const data = await readFile(this.messageFile, 'utf-8');
      return JSON.parse(data) as PostResponseDto[];
    } catch (error) {
      console.error('Error reading messages file:', error);
      return [];
    }
  }

  private async writeMessagesFile(messages: PostResponseDto[]): Promise<void> {
    await writeFile(this.messageFile, JSON.stringify(messages, null, 2));
  }
  // Implement post-related data access methods here
  async findAll(): Promise<PostResponseDto[]> {
    return this.readMessagesFile();
  }

  async findOne(id: string): Promise<PostResponseDto | null> {
    const posts = await this.readMessagesFile();
    return posts.find((post) => post.id === id) || null;
  }

  async create(post: CreatePostDto): Promise<PostResponseDto> {
    const posts = await this.readMessagesFile();
    const newPost = new PostResponseDto(post);
    posts.push(newPost);
    await this.writeMessagesFile(posts);
    return newPost;
  }

  async update(id: string, post: UpdatePostDto): Promise<PostResponseDto> {
    const posts = await this.readMessagesFile();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Post not found');
    }
    posts[index] = new PostResponseDto(post);
    await this.writeMessagesFile(posts);
    return posts[index];
  }

  async delete(id: string): Promise<void> {
    const posts = await this.readMessagesFile();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Post not found');
    }
    posts.splice(index, 1);
    await this.writeMessagesFile(posts);
    return;
  }
}
