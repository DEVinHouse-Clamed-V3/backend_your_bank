import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("movements")
export class Movement {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number;

  @Column()
  value: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  balance: number;

  // relacionamento do cliente com movementacao

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
