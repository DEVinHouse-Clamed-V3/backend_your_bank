import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("credit_cards")
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  placeholder: string;

  @Column({ type: "varchar", length: 150, unique: true })
  number: string;

  @Column({ type: "varchar", length: 3, nullable: true })
  cvv: string;

  @Column({ type: "date", nullable: true })
  expiration_date: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  limit: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
