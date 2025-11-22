/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  username?: string;

  @IsString()
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
