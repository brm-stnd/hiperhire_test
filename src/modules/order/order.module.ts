import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'secret' })],
  controllers: [OrderController],
  providers: [PrismaService, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
