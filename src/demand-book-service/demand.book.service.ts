import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemandBookEntity } from './demand.book.entity';
import { DemandBookDto } from './demand.book.dto';
import {
  ClientProxy,
  RpcException,
} from '@nestjs/microservices';

@Injectable()
export class DemandBookService {
  private readonly logger = new Logger(DemandBookService.name);
  private readonly client: ClientProxy;

  constructor(
    @InjectRepository(DemandBookEntity)
    private readonly demandBookRepository: Repository<DemandBookEntity>,
  ) {}

  public async buildDemandBook(
    demandBookDto: DemandBookDto,
  ): Promise<DemandBookEntity> {
    
    const { userName, bookName, email } = demandBookDto;

    const demand = this.demandBookRepository.create({
      userName,
      bookName,
      email,
    });

    const savedDemand = await this.demandBookRepository.save(demand);

    // Publish the information to the queue
    await this.publishDemandBookToQueue(savedDemand);

    // Log successful creation
    this.logger.log('Demand book created successfully');

    return savedDemand;
  }
  private async publishDemandBookToQueue(
    demandBookDto: DemandBookDto,
  ): Promise<void> {
    try {
      this.client.emit('demand_book_created', demandBookDto);
      this.logger.log('Demand book created and published to the queue');
    } catch (error) {
      this.logger.error(
        `Error publishing demand book to the queue: ${error.message}`,
      );
      throw new RpcException(error.message);
    }
  }
}
