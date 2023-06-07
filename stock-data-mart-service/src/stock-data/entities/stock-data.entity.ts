import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock_data')
export class StockData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  symbol: string;

  @Column('double precision')
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
