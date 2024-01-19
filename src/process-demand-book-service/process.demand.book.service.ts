import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { DemandBookEntity } from '../demand-book-service/demand.book.entity';
import { BookAvailabilityEntity } from './process.demand.book.entity';
import { BookAvailabilityDto } from './process.demand.book.dto';
import { DemandBookDto } from '../demand-book-service/demand.book.dto';

@Injectable()
export class ProcessDemandBookService {
  private readonly logger = new Logger(ProcessDemandBookService.name);
  private readonly client: ClientProxy;

  constructor(
    @InjectRepository(BookAvailabilityEntity)
    private readonly bookAvailabilityRepository: Repository<BookAvailabilityEntity>,
    @InjectRepository(DemandBookEntity)
    private readonly demandBookRepository: Repository<DemandBookEntity>,
  ) {}

  // API endpoint for getting the processed book status
  public async getProcessedBookStatus(
    bookAvailabilityDto: BookAvailabilityDto,
  ): Promise<BookAvailabilityEntity[]> {
    const { bookName } = bookAvailabilityDto;

    // Find processed book in the database
    const processedBooks = await this.bookAvailabilityRepository.find({
      where: { bookName },
    });

    if (!processedBooks || processedBooks.length === 0) {
      throw new NotAcceptableException('No processed book found.');
    }

    return processedBooks;
  }

  // Process demand book
  public async processDemandBook(
    demandBookDto: DemandBookDto,
    bookAvailabilityDto: BookAvailabilityDto,
  ): Promise<void> {
    const { userName } = demandBookDto;
    const { bookName } = bookAvailabilityDto;

    // Simulate random processing delay
    await this.simulateProcessingDelay();

    try {
      // Check if the demand book exists
      const demandBook = await this.demandBookRepository.findBy({ userName });
      if (!demandBook) {
        throw new NotFoundException('Book and book order do not match.');
      }

      // Check if the book is being processed
      const processDemand = await this.bookAvailabilityRepository.existsBy({
        bookName,
      });
      if (!processDemand) {
        throw new NotFoundException(
          'Book does not exist in the processing entity.',
        );
      }
      // Check if the book is available
      const bookAvailability = await this.bookAvailabilityRepository.findOneBy({
        bookName,
      });

      if (!bookAvailability.available) {
        throw new NotAcceptableException('Book is not available');
      }

      // Update the table if the book exists
      bookAvailability.available = false; // Example: Set the book as unavailable
      await this.bookAvailabilityRepository.save(bookAvailability);

      // Process the demand and emit event
      this.logger.log(`Demand for book ${bookName} processed successfully.`);
      this.client.emit('demand_book_processed', { bookName });
    } catch (err) {
      // Log and emit an error event
      this.logger.error(
        `Error processing demand for book ${bookName}: ${err.message}`,
      );
      this.client.emit('demand_book_error', {
        bookName,
        errorMessage: err.message,
      });
    }
  }
  // Simulate random processing delay
  private async simulateProcessingDelay(): Promise<void> {
    const delayMs = Math.floor(Math.random() * 50000);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}
