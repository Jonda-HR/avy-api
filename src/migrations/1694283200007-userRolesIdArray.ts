import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRolesIdArray1694283200007 implements MigrationInterface {
  name = 'UserRolesIdArray1694283200007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleUserId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roleUserId" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleUserId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roleUserId" integer NOT NULL DEFAULT '1'`,
    );
  }
}
