import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1764311766884 implements MigrationInterface {
    name = 'InitSchema1764311766884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_previews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logo_public_id" character varying, "banner_public_id" character varying, "culture_video_public_id" character varying, "logo_url" character varying, "banner_url" character varying, "brand_color" character varying, "culture_video_url" character varying, "sections" jsonb, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" uuid, CONSTRAINT "REL_8a1c34055a330c22e082964010" UNIQUE ("company_id"), CONSTRAINT "PK_87ad69f9405ed2fc89dca79d39b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "logo_url"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "banner_url"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "brand_color"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "culture_video_url"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "draft_sections"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "logo_public_id"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "banner_public_id"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "culture_video_public_id"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "published_logo_url" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "published_banner_url" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "published_brand_color" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "published_culture_video_url" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "previewId" uuid`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_954d133c4555e85edd7baaa1a4b" UNIQUE ("previewId")`);
        await queryRunner.query(`ALTER TABLE "company_previews" ADD CONSTRAINT "FK_8a1c34055a330c22e0829640100" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_954d133c4555e85edd7baaa1a4b" FOREIGN KEY ("previewId") REFERENCES "company_previews"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_954d133c4555e85edd7baaa1a4b"`);
        await queryRunner.query(`ALTER TABLE "company_previews" DROP CONSTRAINT "FK_8a1c34055a330c22e0829640100"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_954d133c4555e85edd7baaa1a4b"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "previewId"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "published_culture_video_url"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "published_brand_color"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "published_banner_url"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "published_logo_url"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "culture_video_public_id" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "banner_public_id" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "logo_public_id" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "draft_sections" jsonb`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "culture_video_url" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "brand_color" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "banner_url" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "logo_url" character varying`);
        await queryRunner.query(`DROP TABLE "company_previews"`);
    }

}
