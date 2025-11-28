import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company, Section } from "./company";

@Entity("company_previews")
export class CompanyPreview {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** Linked Company */
  @OneToOne(() => Company, (company) => company.preview)
  @JoinColumn({ name: "company_id" })
  company: Company;

  /** Editable (draft) brand public ids */
  @Column({ nullable: true })
  logo_public_id: string;

  @Column({ nullable: true })
  banner_public_id: string;

  @Column({ nullable: true })
  culture_video_public_id: string;

  /** Editable (draft) brand fields */
  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  banner_url: string;

  @Column({ nullable: true })
  brand_color: string;

  @Column({ nullable: true })
  culture_video_url: string;

  /** Editable (draft) sections */
  @Column("jsonb", { nullable: true })
  sections: Section[];

  @UpdateDateColumn()
  updated_at: Date;
}
