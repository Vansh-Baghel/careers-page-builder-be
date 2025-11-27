import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1764219292459 implements MigrationInterface {
    name = 'InitSchema1764219292459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."jobs_work_policy_enum" AS ENUM('remote', 'hybrid', 'onsite')`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_employment_type_enum" AS ENUM('full-time', 'part-time', 'internship')`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_experience_level_enum" AS ENUM('junior', 'mid', 'senior')`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_job_type_enum" AS ENUM('permanent', 'contract')`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "work_policy" "public"."jobs_work_policy_enum" NOT NULL, "location" character varying NOT NULL, "department" character varying NOT NULL, "employment_type" "public"."jobs_employment_type_enum" NOT NULL, "experience_level" "public"."jobs_experience_level_enum" NOT NULL, "job_type" "public"."jobs_job_type_enum" NOT NULL, "salary_range" character varying NOT NULL, "job_slug" character varying NOT NULL, "posted_days_ago" integer NOT NULL, "is_published" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_theme_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "snapshot" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_320c5cbdcfbd2e2d2736ff6db92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "logo_url" character varying, "banner_url" character varying, "brand_color" character varying, "culture_video_url" character varying, "published_sections" jsonb, "draft_sections" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "UQ_b28b07d25e4324eee577de5496d" UNIQUE ("slug"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."recruiters_role_enum" AS ENUM('recruiter', 'admin')`);
        await queryRunner.query(`CREATE TABLE "recruiters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "role" "public"."recruiters_role_enum" NOT NULL DEFAULT 'recruiter', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "UQ_67a547d9a83ee186a56393bee90" UNIQUE ("email"), CONSTRAINT "PK_1999e5a8e68fa6c525eed22c970" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_theme_history" ADD CONSTRAINT "FK_ea37eeefc27bc46ef51794f8931" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "FK_c6e4ea6d4b0c6d3fd2b09a34327" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "FK_c6e4ea6d4b0c6d3fd2b09a34327"`);
        await queryRunner.query(`ALTER TABLE "company_theme_history" DROP CONSTRAINT "FK_ea37eeefc27bc46ef51794f8931"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801"`);
        await queryRunner.query(`DROP TABLE "recruiters"`);
        await queryRunner.query(`DROP TYPE "public"."recruiters_role_enum"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "company_theme_history"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_job_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_experience_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_employment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_work_policy_enum"`);
    }

}
