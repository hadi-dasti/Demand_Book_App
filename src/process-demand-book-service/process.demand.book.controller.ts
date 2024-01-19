import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx } from '@nestjs/microservices';
import { ProcessDemandBookService } from './process.demand.book.service';
import { BookAvailabilityDto } from './process.demand.book.dto';
import { BookAvailabilityEntity } from './process.demand.book.entity';

@Controller('demand-book')
export class ProcessDemandBookController {
  private readonly logger = new Logger(ProcessDemandBookController.name);

  constructor(
    private readonly processDemandBookService: ProcessDemandBookService,
  ) {}

  // API endpoint for getting the processed book
  @Get('process-book')
  public async getProcessBook(
    BookAvailabilityDto: BookAvailabilityDto,
  ): Promise<BookAvailabilityEntity[]> {
    return this.processDemandBookService.getProcessedBookStatus(
      BookAvailabilityDto,
    );
  }

  // Message pattern for processing demand book requests
  @MessagePattern('demand_book_request')
  async processDemandBook(
    @Payload() message: any,
    @Ctx() context: Record<string, any>,
  ): Promise<void> {
    this.logger.log(`Received demand book request for ${message.bookName}`);

    // Process the demand and acknowledge the message
    this.processDemandBookService.processDemandBook;
    context.channel.ack(context.getMessage());
    }
    
  // Event handler for successful demand processing
  @MessagePattern('demand_book_processed')
  handleDemandProcessed(@Payload() payload: any): void {
    this.logger.log(`Demand book processed successfully: ${payload.bookName}`);
  }

  // Event handler for demand processing errors
  @MessagePattern('demand_book_error')
  handleDemandError(@Payload() payload: any): void {
    this.logger.error(
      `Error processing demand for book ${payload.bookName}: ${payload.errorMessage}`,
    );
  }
}
