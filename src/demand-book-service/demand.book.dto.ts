import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class DemandBookDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  readonly bookName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
