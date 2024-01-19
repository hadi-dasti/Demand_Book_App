import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createRabbitMQMicroservice } from './rabbitmq/rabbitmq.microservice';


async function bootstrap() {
  //Create the main NestJS application
  const mainApp = await NestFactory.create(AppModule);

  // Create and start the RabbitMQ microservice
  await createRabbitMQMicroservice();

  
  await mainApp.listen(3000);
}

bootstrap();
