import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}
