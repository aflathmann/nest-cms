import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, world!',
  })
  content?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the message',
    example: 'Greetings',
  })
  title?: string;
}
