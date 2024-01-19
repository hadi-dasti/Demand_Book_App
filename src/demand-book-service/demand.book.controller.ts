import { Controller,Body,Post } from "@nestjs/common";
import { DemandBookService } from './demand.book.service';
import { DemandBookDto } from "./demand.book.dto";
import { DemandBookEntity } from './demand.book.entity';



@Controller('/demand-book')
export class DemandBookController {
  constructor(private readonly demandBookService: DemandBookService) {}

  @Post()
  public async createDemand(
    @Body() demandBookDto: DemandBookDto,
  ): Promise<DemandBookEntity> {
    return await this.demandBookService.buildDemandBook(demandBookDto);
  }
}