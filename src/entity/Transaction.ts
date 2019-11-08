import {
  Entity,
  Column,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;
}
