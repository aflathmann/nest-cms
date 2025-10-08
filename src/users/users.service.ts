import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  // Implement user-related business logic here

  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Benutzer nicht gefunden');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersRepository.create(createUserDto);
  }

  async update(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    return this.usersRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.usersRepository.delete(id);
  }
}
