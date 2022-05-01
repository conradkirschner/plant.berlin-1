import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1651164172799 implements MigrationInterface {
    name = 'newMigration1651164172799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "username" character varying NOT NULL, "anzeigeName" character varying NOT NULL, "password" character varying NOT NULL, "emailVerification" character varying, CONSTRAINT "UQ_a4710ac7378e34367c12f08a87f" UNIQUE ("emailVerification"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
