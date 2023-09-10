import { MigrationInterface, QueryRunner } from "typeorm";

export class MinistryModule1694371274638 implements MigrationInterface {
    name = 'MinistryModule1694371274638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ministry" ("id" SERIAL NOT NULL, "ministryName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_befb91c942bb9cae469bb11a4fc" UNIQUE ("ministryName"), CONSTRAINT "PK_9279166bcd571de7497c6c667a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member_ministry" ("memberId" integer NOT NULL, "ministryId" integer NOT NULL, CONSTRAINT "PK_547d9e7d35d555dcb2743902271" PRIMARY KEY ("memberId", "ministryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cc18f7e1205b4f6f0c0bf1a20f" ON "member_ministry" ("memberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_de1700fb498dec59a880a6375d" ON "member_ministry" ("ministryId") `);
        await queryRunner.query(`ALTER TABLE "member_ministry" ADD CONSTRAINT "FK_cc18f7e1205b4f6f0c0bf1a20fa" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "member_ministry" ADD CONSTRAINT "FK_de1700fb498dec59a880a6375d4" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_ministry" DROP CONSTRAINT "FK_de1700fb498dec59a880a6375d4"`);
        await queryRunner.query(`ALTER TABLE "member_ministry" DROP CONSTRAINT "FK_cc18f7e1205b4f6f0c0bf1a20fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de1700fb498dec59a880a6375d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc18f7e1205b4f6f0c0bf1a20f"`);
        await queryRunner.query(`DROP TABLE "member_ministry"`);
        await queryRunner.query(`DROP TABLE "ministry"`);
    }

}
