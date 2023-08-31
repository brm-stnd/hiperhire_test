import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { IResponse } from '../../global.interface';
import { OrderBodyDto } from './order.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async order(userRequest, data: OrderBodyDto): Promise<IResponse> {
    const { bookId } = data;
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new HttpException(`Book not found`, HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userRequest.id,
      },
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }

    const newPoint = user.point - book.point;
    if (newPoint < 0) {
      throw new HttpException(`User point not enought`, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.$transaction([
      this.prisma.order.create({
        data: {
          userId: user.id,
          bookId: book.id,
          point: book.point,
        },
      }),
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          point: newPoint,
        },
      }),
    ]);

    return {
      status: HttpStatus.OK,
      result: `${book.title} ordered`,
    };
  }

  async cancelOrder(userRequest, id: number): Promise<IResponse> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new HttpException(`order not found`, HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userRequest.id,
      },
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }

    const newPoint = user.point + order.point;

    await this.prisma.$transaction([
      this.prisma.order.delete({
        where: {
          id: id,
        },
      }),
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          point: newPoint,
        },
      }),
    ]);

    return {
      status: HttpStatus.OK,
      result: `order canceled`,
    };
  }

  async listOrder(userRequest, query): Promise<IResponse> {
    const { page = 1, limit = 10 } = query;
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userRequest.id,
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    return {
      status: HttpStatus.OK,
      result: orders,
    };
  }
}
