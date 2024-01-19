import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandBookEntity } from './demand.book.entity';
import { DemandBookController } from './demand.book.controller';
import { DemandBookService } from './demand.book.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DemandBookEntity]),
    RabbitmqModule],
  providers: [DemandBookService],
  controllers: [DemandBookController],
})
export class DemandBookModule {}
