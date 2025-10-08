import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  constructor() {
    // Initialize your database connection here
  }

  private messageFile = 'messages.json';

  private async readMessagesFile(): Promise<MessageResponseDto[]> {
    try {
      const data = await readFile(this.messageFile, 'utf-8');
      return JSON.parse(data) as MessageResponseDto[];
    } catch (error) {
      console.error('Error reading messages file:', error);
      return [];
    }
  }

  private async writeMessagesFile(
    messages: MessageResponseDto[],
  ): Promise<void> {
    await writeFile(this.messageFile, JSON.stringify(messages, null, 2));
  }

  async findOne(id: string): Promise<MessageResponseDto | null> {
    const messages = await this.readMessagesFile();
    const message = messages.find((msg) => msg.id === id);
    return message || null;
  }

  async findAll(): Promise<MessageResponseDto[]> {
    return this.readMessagesFile();
  }

  async create(data: CreateMessageDto): Promise<MessageResponseDto> {
    const messages = await this.readMessagesFile();
    const id = uuidv4();
    const newMessage = { id, ownerId: 'abc123', ...data };
    messages.push(newMessage);
    await this.writeMessagesFile(messages);
    return newMessage;
  }

  async update(
    id: string,
    data: UpdateMessageDto,
  ): Promise<MessageResponseDto> {
    const messages = await this.readMessagesFile();
    const messageIndex = messages.findIndex((msg) => msg.id === id);
    if (messageIndex === -1) {
      throw new Error('Message not found');
    }
    const updatedMessage: MessageResponseDto = {
      id,
      ownerId: 'abc123',
      title: data.title ?? messages[messageIndex].title,
      content: data.content ?? messages[messageIndex].content,
    };
    messages[messageIndex] = updatedMessage;
    await this.writeMessagesFile(messages);
    return updatedMessage;
  }

  async delete(id: string): Promise<void> {
    const messages = await this.readMessagesFile();
    const messageIndex = messages.findIndex((msg) => msg.id === id);
    if (messageIndex === -1) {
      throw new Error('Message not found');
    }
    messages.splice(messageIndex, 1);
    await this.writeMessagesFile(messages);
  }
}
