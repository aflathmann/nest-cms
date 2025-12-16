/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsArray, IsIn, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common';

export class UpdateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  email?: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password?: string;

  @IsArray()
  @IsIn([Role.USER, Role.ADMIN, Role.MODERATOR, Role.EDITOR], { each: true })
  @IsString({ each: true })
  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['USER'],
    isArray: true,
    type: [String],
  })
  roles: Role[];

  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName?: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName?: string;
}
