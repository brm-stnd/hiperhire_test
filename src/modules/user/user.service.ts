import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IResponse } from '../../global.interface';
import { LoginUserBodyDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<IResponse> {
    const { email, name, password } = data;
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isEmailExist) {
      throw new HttpException(
        `Sorry, ${email} has already been taken`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    await this.prisma.user.create({
      data: {
        email,
        name,
        password: hash,
        point: 100,
      },
    });

    return { status: HttpStatus.OK, result: 'user added' };
  }

  async loginUser(data: LoginUserBodyDto): Promise<IResponse> {
    const { email, password } = data;
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const isMatch = await bcrypt.compare(password, isEmailExist.password);
    if (!isMatch) {
      throw new HttpException(
        `Invalid Email or Password`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { id: isEmailExist.id, email: email };

    const token = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      status: HttpStatus.OK,
      result: {
        message: 'login success',
        token,
      },
    };
  }
}
