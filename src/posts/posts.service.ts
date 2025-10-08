import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  // Implement post-related business logic here
  async findAll(): Promise<PostResponseDto[]> {
    return await this.postsRepository.findAll();
  }

  async findOne(id: string): Promise<PostResponseDto> {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    return await this.postsRepository.create(createPostDto);
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    const existingPost = await this.postsRepository.findOne(id);
    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }
    return await this.postsRepository.update(id, updatePostDto);
  }

  async delete(id: string): Promise<void> {
    const existingPost = await this.postsRepository.findOne(id);
    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }
    return await this.postsRepository.delete(id);
  }
}
