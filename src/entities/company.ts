import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Job } from "./job";
import { Recruiter } from "./recruiter";
import { CompanyPreview } from "./company-previews";

export type Section =
  | { type: "hero"; description: string }
  | { type: "about"; description: string }
  | { type: "benefits"; description: string }
  | { type: "jobs"; heading?: string; showFilter?: boolean };

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string; // public URL name

  @Column("jsonb", { nullable: true })
  published_sections: Section[];

  @Column({ nullable: true })
  published_logo_url: string;

  @Column({ nullable: true })
  published_banner_url: string;

  @Column({ nullable: true })
  published_brand_color: string;

  @Column({ nullable: true })
  published_culture_video_url: string;

  @OneToOne(() => CompanyPreview, (preview) => preview.company)
  preview: CompanyPreview;

  @OneToMany(() => Recruiter, (user) => user.company)
  recruiters: Recruiter[];

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
