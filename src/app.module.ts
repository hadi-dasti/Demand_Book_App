import { Module } from '@nestjs/common';
import { DemandBookModule } from './demand-book-service/demand.book.module';
import { ProcessDemandBookModule } from './process-demand-book-service/process.demand.book.module';
import { SharedModule } from './shared/shared.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    DemandBookModule,
    ProcessDemandBookModule,
    SharedModule,
    RabbitmqModule,
  ],
})
export class AppModule {}
