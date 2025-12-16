import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['USER'],
    isArray: true,
    type: [String],
  })
  roles: string[];

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2023-10-01T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the user',
    example: '2023-10-02T12:34:56.789Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The date when the user last changed their password',
    example: '2023-10-03T12:34:56.789Z',
  })
  passwordChangedAt: Date;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  email: string;
}
