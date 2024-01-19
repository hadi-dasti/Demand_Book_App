import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookAvailabilityEntity } from './process.demand.book.entity';
import { ProcessDemandBookController } from './process.demand.book.controller';
import { ProcessDemandBookService } from './process.demand.book.service';
import { DemandBookEntity } from 'src/demand-book-service/demand.book.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([BookAvailabilityEntity, DemandBookEntity]),
  ],
  providers: [ProcessDemandBookService],
  controllers: [ProcessDemandBookController],
})
export class ProcessDemandBookModule {}
