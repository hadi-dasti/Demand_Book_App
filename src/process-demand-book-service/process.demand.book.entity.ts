import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BookAvailabilityEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  bookName: string;

  @Column({ default: true })
  available: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}