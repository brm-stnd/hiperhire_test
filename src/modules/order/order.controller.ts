import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Req,
  Res,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { OrderBodyDto } from './order.dto';
import { User as UserModel } from '@prisma/client';
import { OrderService } from './order.service';
import { AuthGuard } from '../../middleware/verify.middleware';
import { RabbitMQService } from '../../rabbitmq.service';

@Controller({ path: 'order' })
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createOrder(
    @Req() req,
    @Res() res,
    @Body() userData: OrderBodyDto,
  ): Promise<UserModel> {
    try {
      const { user } = req;
      const resp = await this.orderService.order(user, userData);

      this.rabbitMQService.send('rabbit-mq-logs', {
        message: resp,
      });

      return res.status(resp.status).json({
        status: resp.status,
        message: resp.result || resp,
      });
    } catch (e) {
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async cancelOrder(
    @Req() req,
    @Res() res,
    @Param('id') id: string,
  ): Promise<UserModel> {
    try {
      const { user } = req;
      const resp = await this.orderService.cancelOrder(user, parseInt(id));

      this.rabbitMQService.send('rabbit-mq-logs', {
        message: resp,
      });

      return res.status(resp.status).json({
        status: resp.status,
        message: resp.result || resp,
      });
    } catch (e) {
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async listOrder(@Req() req, @Res() res, @Query() query): Promise<UserModel> {
    try {
      const { user } = req;
      const resp = await this.orderService.listOrder(user, query);

      this.rabbitMQService.send('rabbit-mq-logs', {
        message: resp,
      });

      return res.status(resp.status).json({
        status: resp.status,
        message: resp.result || resp,
      });
    } catch (e) {
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }
}
