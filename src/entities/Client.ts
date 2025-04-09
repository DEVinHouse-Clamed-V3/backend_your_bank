import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  income: number;

  @Column()
  email: string;

  @Column()
  user_id: number;

  // relacionamento do cliente com usuário

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
