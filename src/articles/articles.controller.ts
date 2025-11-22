import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor() {}
}
