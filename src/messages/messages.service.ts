import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';

import { MessagesRepository } from './messages.repository';

import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  async findOne(id: string): Promise<MessageResponseDto | null> {
    const message = await this.messagesRepository.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async findAll(): Promise<MessageResponseDto[]> {
    return this.messagesRepository.findAll();
  }

  async create(data: CreateMessageDto): Promise<MessageResponseDto> {
    return this.messagesRepository.create(data);
  }

  async update(
    id: string,
    data: UpdateMessageDto,
  ): Promise<MessageResponseDto> {
    const message = await this.messagesRepository.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return this.messagesRepository.update(id, data);
  }

  async delete(id: string) {
    const message = await this.messagesRepository.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return this.messagesRepository.delete(id);
  }
}

export { MessagesService };
