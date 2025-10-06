import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreateMessageDto,
  MessageResponseDto,
  UpdateMessageDto,
} from '../dto/message.dto';
import { MessagesService } from './messages.service';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @ApiOperation({ summary: 'List all messages' })
  @ApiResponse({
    status: 200,
    description: 'List of messages',
    type: [MessageResponseDto],
  })
  async findAll(): Promise<MessageResponseDto[]> {
    return await this.messagesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({
    status: 201,
    description: 'The created message',
    type: MessageResponseDto,
  })
  async createMessage(@Body() body: CreateMessageDto) {
    const result = await this.messagesService.create(body);
    return result;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a message by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateMessageDto })
  @ApiResponse({
    status: 200,
    description: 'The updated message',
    type: MessageResponseDto,
  })
  async updateMessage(@Param('id') id: string, @Body() body: CreateMessageDto) {
    const result = await this.messagesService.update(id, body);
    return result;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a message by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The found message',
    type: MessageResponseDto,
  })
  async getMessage(
    @Param('id') id: string,
  ): Promise<MessageResponseDto | null> {
    return await this.messagesService.findOne(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 204,
    description: 'The message has been deleted',
  })
  async deleteMessage(@Param('id') id: string): Promise<void> {
    return await this.messagesService.delete(id);
  }
}
