/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, world!',
  })
  content: string;
}
export class UpdateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, world!',
  })
  content: string;
}

export class MessageResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, world!',
  })
  content: string;
}
