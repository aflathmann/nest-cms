import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  email: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['USER'],
    isArray: true,
    type: String,
  })
  roles: Role[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;
}
