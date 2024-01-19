import { IsString, IsBoolean } from 'class-validator';

export class BookAvailabilityDto {
  @IsString()
  readonly bookName: string;

  @IsBoolean()
  readonly available: boolean;
}
