import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PasswordUtil } from 'src/common/utils';
import { Role } from 'src/common/decorators';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.repository.findAndCount({
      take: limit,
      skip: skip,
    });

    return {
      data: items as UserResponseDto[],
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user as UserResponseDto;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Eine Query mit OR-Bedingung für beide Felder
    const existingUser = await this.repository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const userData = {
      ...createUserDto,
      passwordHash: await PasswordUtil.hashPassword(createUserDto.password),
    };

    const user = this.repository.create(userData);
    await this.repository.save(user);
    return user as UserResponseDto;
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    const existingUser = await this.repository.findOne({
      where: { email: registerUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const userData = {
      ...registerUserDto,
      roles: [Role.USER],
      passwordHash: await PasswordUtil.hashPassword(registerUserDto.password),
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

  async uploadAvatar(id: string, file: Express.Multer.File) {
    await this.repository.update(id, { avatarUrl: file.path });
  }
}
