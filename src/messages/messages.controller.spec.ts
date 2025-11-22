import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';

describe('MessagesController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new message', () => {
      const createMessageDto = {
        content: 'Hello, world!',
        title: 'Greeting',
      };
      expect(controller.create(createMessageDto)).toEqual({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(String),
        ...createMessageDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of messages', () => {
      expect(controller.findAll()).toEqual([
        { id: '1', content: 'message 1', title: 'Greeting' },
        { id: '2', content: 'message 2', title: 'Greeting' },
      ]);
    });
  });

  describe('getMessage', () => {
    it('should return a message by ID', () => {
      expect(controller.getMessage('1')).toEqual({
        id: '1',
        content: 'message 1',
        title: 'Greeting',
      });
    });
  });

  describe('updateMessage', () => {
    it('should update a message by ID', () => {
      const updateMessageDto = { content: 'Updated message' };
      expect(controller.update('1', updateMessageDto)).toEqual({
        id: '1',
        ...updateMessageDto,
      });
    });
  });
});
