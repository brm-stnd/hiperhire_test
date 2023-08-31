import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}
