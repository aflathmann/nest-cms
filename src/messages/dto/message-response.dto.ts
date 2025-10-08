import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The owner of the message',
    example: '1',
  })
  ownerId: string;

  @ApiProperty({
    description: 'The title of the message',
    example: 'Greetings',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, world!',
  })
  content: string;
}
