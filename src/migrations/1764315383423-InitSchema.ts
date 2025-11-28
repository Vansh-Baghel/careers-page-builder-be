import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1764315383423 implements MigrationInterface {
    name = 'InitSchema1764315383423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_954d133c4555e85edd7baaa1a4b"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_954d133c4555e85edd7baaa1a4b"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "previewId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "previewId" uuid`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_954d133c4555e85edd7baaa1a4b" UNIQUE ("previewId")`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_954d133c4555e85edd7baaa1a4b" FOREIGN KEY ("previewId") REFERENCES "company_previews"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
