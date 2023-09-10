import { MigrationInterface, QueryRunner } from 'typeorm';

export class DinnerModule21694382315701 implements MigrationInterface {
  name = 'DinnerModule21694382315701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD "growthGroupId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dinner" ALTER COLUMN "raisedMoney" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_399493e12acbbef6758363907ab" FOREIGN KEY ("growthGroupId") REFERENCES "growth_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_399493e12acbbef6758363907ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dinner" ALTER COLUMN "raisedMoney" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "growthGroupId"`);
  }
}
