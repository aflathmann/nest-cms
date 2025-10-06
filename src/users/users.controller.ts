import { Controller, Get, Post, Patch } from '@nestjs/common';
import { Body, Delete, Param } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from 'src/dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    return await this.usersService.findOne(id);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
