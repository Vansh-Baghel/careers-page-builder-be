import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Company } from "./company";

@Entity("company_theme_history")
export class CompanyThemeHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Company, (company) => company.history, { onDelete: "CASCADE" })
  company: Company;

  @Column({ type: "jsonb" })
  snapshot: any;

  @CreateDateColumn()
  created_at: Date;
}
