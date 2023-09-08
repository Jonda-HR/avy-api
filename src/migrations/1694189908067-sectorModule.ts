import { MigrationInterface, QueryRunner } from 'typeorm';

export class SectorModule1694189908067 implements MigrationInterface {
  name = 'SectorModule1694189908067';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sector" ("id" SERIAL NOT NULL, "sectorName" character varying NOT NULL, "supervisorId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_e7c9b8c5d1ec312db40de3c528" UNIQUE ("supervisorId"), CONSTRAINT "PK_668b2ea8a2f534425407732f3ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sector" ADD CONSTRAINT "FK_e7c9b8c5d1ec312db40de3c5289" FOREIGN KEY ("supervisorId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sector" DROP CONSTRAINT "FK_e7c9b8c5d1ec312db40de3c5289"`,
    );
    await queryRunner.query(`DROP TABLE "sector"`);
  }
}
