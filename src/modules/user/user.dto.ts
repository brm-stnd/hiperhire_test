import {
  IsNotEmpty,
  IsString,
  IsAlphanumeric,
  MinLength,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsAlphanumeric()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}

export class LoginUserBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
