/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';
export class CreateFeedDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  body: string;
}
