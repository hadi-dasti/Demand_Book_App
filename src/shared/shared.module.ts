import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigLibraryApp } from './database.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfigLibraryApp)],
})
export class SharedModule {}
