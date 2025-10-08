/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryId?: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty({ type: [String] })
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status?: string;
}
