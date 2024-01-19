// rabbitmq.microservice.ts
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { RabbitmqModule } from './rabbitmq.module';

/**
 * Function to create and start a RabbitMQ microservice for the library book service.
 * The microservice is configured to use RMQ (RabbitMQ) transport.
 */
export async function createRabbitMQMicroservice() {
  const libraryBookService = await NestFactory.createMicroservice(
    RabbitmqModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'book_queue',
        queueOptions: {
          durable: false,
        },
        exchange: 'library-app',
        exchangeOptions: {
          type: 'topic',
        },
        routingKey: 'book.*',
      },
    },
  );
  await libraryBookService.listen();
}
