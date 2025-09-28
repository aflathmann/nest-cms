import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateMessageDto, MessageResponseDto } from '../dto/message.dto';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  @Get()
  @ApiOperation({ summary: 'List all messages' })
  @ApiResponse({
    status: 200,
    description: 'List of messages',
    type: [MessageResponseDto],
  })
  listMessages(): MessageResponseDto[] {
    return [];
  }

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({
    status: 201,
    description: 'The created message',
    type: MessageResponseDto,
  })
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return { id: '1', ...body };
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a message by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({
    status: 200,
    description: 'The updated message',
    type: MessageResponseDto,
  })
  updateMessage(@Param('id') id: string, @Body() body: CreateMessageDto) {
    console.log(id, body);
    return { id, ...body };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a message by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The found message',
    type: MessageResponseDto,
  })
  getMessage(@Param('id') id: string): MessageResponseDto {
    console.log(id);
    return {
      id,
      content: `message ${id}`,
    };
  }
}
