import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PasswordUtil } from 'src/common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repository.find();
    return users as UserResponseDto[];
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user as UserResponseDto;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userData = {
      ...createUserDto,
      passwordHash: await PasswordUtil.hashPassword(createUserDto.password),
    };
    const user = this.repository.create(userData);
    await this.repository.save(user);
    return user as UserResponseDto;
  }

  async update(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
