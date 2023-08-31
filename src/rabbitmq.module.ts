import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'rabbit-mq-logs',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
