import { MigrationInterface, QueryRunner } from 'typeorm';

export class GrowthGroupModule1694366177187 implements MigrationInterface {
  name = 'GrowthGroupModule1694366177187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "growth_group" ("id" SERIAL NOT NULL, "growthGroupName" character varying NOT NULL, "headquarters" character varying, "sectorId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_7355c475c65e233092984458dfb" UNIQUE ("growthGroupName"), CONSTRAINT "PK_3071dd6bc19ab6d16be5863f03b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "growth_group" ADD CONSTRAINT "FK_c01aea16fb89b32f1e9b5feb110" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "growth_group" DROP CONSTRAINT "FK_c01aea16fb89b32f1e9b5feb110"`,
    );
    await queryRunner.query(`DROP TABLE "growth_group"`);
  }
}
