import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoles1694284549324 implements MigrationInterface {
  name = 'UserRoles1694284549324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_2c98da123a42aff01db972e0a71"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleUserId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roleUserId" character varying NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleUserId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roleUserId" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_2c98da123a42aff01db972e0a71" FOREIGN KEY ("roleUserId") REFERENCES "role_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
