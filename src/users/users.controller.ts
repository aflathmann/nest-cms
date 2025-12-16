import {
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { Body, Delete, Param } from '@nestjs/common/decorators';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles, Role } from '../common/decorators';
import { RolesGuard } from '../common/guards';

import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

import { UsersService } from './users.service';

import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponseDto],
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    return await this.usersService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The created user',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: UserResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    return await this.usersService.findOne(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: UserResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.usersService.delete(id);
  }

  @Post(':id/avatar')
  @ApiOperation({ summary: 'Upload or update user avatar' })
  @ApiResponse({
    status: 200,
    description: 'Avatar uploaded/updated successfully',
  })
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    // Implementation for avatar upload would go here
    await this.usersService.uploadAvatar(id, file);
  }
}
