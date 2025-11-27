import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./company";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Company, (company) => company.jobs, { onDelete: "CASCADE" })
  company: Company;

  @Column()
  title: string;

  @Column({ type: "enum", enum: ["remote", "hybrid", "onsite"] })
  work_policy: string;

  @Column()
  location: string;

  @Column()
  department: string;

  @Column({
    type: "enum",
    enum: ["full-time", "part-time", "internship"],
  })
  employment_type: string;

  @Column({ type: "enum", enum: ["junior", "mid", "senior"] })
  experience_level: string;

  @Column({ type: "enum", enum: ["permanent", "contract"] })
  job_type: string;

  @Column()
  salary_range: string;

  @Column()
  job_slug: string;

  @Column({ type: "int" })
  posted_days_ago: number;

  @Column({ default: true })
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
