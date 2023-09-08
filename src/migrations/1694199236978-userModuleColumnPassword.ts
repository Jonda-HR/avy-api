import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserModuleColumnPassword1694199236978
  implements MigrationInterface
{
  name = 'UserModuleColumnPassword1694199236978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
