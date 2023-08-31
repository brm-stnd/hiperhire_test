import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { RabbitMQModule } from './rabbitmq.module';

@Module({
  imports: [UserModule, OrderModule, RabbitMQModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
