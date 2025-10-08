import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class UsersRepository {
  private messageFile = 'users.json';

  private async readMessagesFile(): Promise<UserResponseDto[]> {
    try {
      const data = await readFile(this.messageFile, 'utf-8');
      return JSON.parse(data) as UserResponseDto[];
    } catch (error) {
      console.error('Error reading messages file:', error);
      return [];
    }
  }

  private async writeMessagesFile(messages: UserResponseDto[]): Promise<void> {
    await writeFile(this.messageFile, JSON.stringify(messages, null, 2));
  }

  // Implement user-related data access methods here
  async findAll(): Promise<UserResponseDto[]> {
    return this.readMessagesFile();
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const users = await this.readMessagesFile();
    return users.find((user) => user.id === id) || null;
  }

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const users = await this.readMessagesFile();
    const newUser = new UserResponseDto(user);
    users.push(newUser);
    await this.writeMessagesFile(users);
    return newUser;
  }

  async update(
    id: string,
    user: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    const users = await this.readMessagesFile();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return null;
    }
    users[index] = new UserResponseDto({ ...users[index], ...user });
    await this.writeMessagesFile(users);
    return users[index];
  }

  async delete(id: string): Promise<void> {
    const users = await this.readMessagesFile();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return;
    }
    users.splice(index, 1);
    await this.writeMessagesFile(users);
  }
}
