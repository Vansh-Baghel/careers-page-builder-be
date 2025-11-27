import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1764247629887 implements MigrationInterface {
    name = 'InitSchema1764247629887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "logo_public_id" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "banner_public_id" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "culture_video_public_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "culture_video_public_id"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "banner_public_id"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "logo_public_id"`);
    }

}
