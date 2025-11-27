import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Job } from "./job";
import { CompanyThemeHistory } from "./companyThemeHistory";
import { Recruiter } from "./recruiter";

export type Section =
  | {
      type: "hero";
      description: string;
    }
  | {
      type: "about";
      description: string;
    }
  | {
      type: "benefits";
      description: string;
    }
  | {
      type: "jobs";
      heading?: string;
      showFilter?: boolean;
    };

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string; // used in public URL like /whitecarrot/careers

  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  banner_url: string;

  @Column({ nullable: true })
  logo_public_id: string;

  @Column({ nullable: true })
  banner_public_id: string;

  @Column({ nullable: true })
  culture_video_public_id: string;

  @Column({ nullable: true })
  brand_color: string;

  @Column({ nullable: true })
  culture_video_url: string;

  @Column({ type: "jsonb", nullable: true })
  published_sections: Section[] | null;

  @Column({ type: "jsonb", nullable: true })
  draft_sections: Section[] | null;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

  @OneToMany(() => Recruiter, (user) => user.company)
  recruiters: Recruiter[];

  @OneToMany(() => CompanyThemeHistory, (history) => history.company)
  history: CompanyThemeHistory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
