import { TypeOrmModule } from '@nestjs/typeorm';

// Configuration options for TypeORM connection in the Library_app project
export const typeOrmConfigLibraryApp: TypeOrmModule = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0083499970',
    database: 'book_order',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
};