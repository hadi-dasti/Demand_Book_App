import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn } from "typeorm";

@Entity()
export class DemandBookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  userName: string;
  @Column()
  bookName: string;
  @Column()
  email: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}