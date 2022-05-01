import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1651176650502 implements MigrationInterface {
    name = 'PostRefactoring1651176650502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "fromId" integer, "toId" integer, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "picture" ("id" SERIAL NOT NULL, "pictureLink" character varying NOT NULL, "fromId" integer, "baumscheibeId" integer, CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "baumscheiben_account" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_ee22da40b58ad7e8fd8f43f9432" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "encryption" character varying NOT NULL, "key" character varying NOT NULL, "fromId" integer, "baumscheibeId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "baumscheibe" ("id" SERIAL NOT NULL, "baumid" character varying NOT NULL, "type" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "createFromId" integer, CONSTRAINT "PK_eb4a2919d7299f816231e182f82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_2d7c74cde93c4f13e68d0df0e85" FOREIGN KEY ("fromId") REFERENCES "baumscheiben_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f0a2364e3d3af73cc9828cf6baf" FOREIGN KEY ("toId") REFERENCES "baumscheibe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_9f27d092e9ab7ff16f153031202" FOREIGN KEY ("fromId") REFERENCES "baumscheiben_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_b6da279e4208962d39f64b63159" FOREIGN KEY ("baumscheibeId") REFERENCES "baumscheibe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_776000050f42ddb61d3c628ff16" FOREIGN KEY ("fromId") REFERENCES "baumscheiben_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_42d33b02cccb86df28b4343db8b" FOREIGN KEY ("baumscheibeId") REFERENCES "baumscheibe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "baumscheibe" ADD CONSTRAINT "FK_0c46591906772ce5dc2f02868d8" FOREIGN KEY ("createFromId") REFERENCES "baumscheiben_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "baumscheibe" DROP CONSTRAINT "FK_0c46591906772ce5dc2f02868d8"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_42d33b02cccb86df28b4343db8b"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_776000050f42ddb61d3c628ff16"`);
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_b6da279e4208962d39f64b63159"`);
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_9f27d092e9ab7ff16f153031202"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f0a2364e3d3af73cc9828cf6baf"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_2d7c74cde93c4f13e68d0df0e85"`);
        await queryRunner.query(`DROP TABLE "baumscheibe"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "baumscheiben_account"`);
        await queryRunner.query(`DROP TABLE "picture"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
