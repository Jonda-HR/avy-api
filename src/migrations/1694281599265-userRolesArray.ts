import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRolesArray1694281599265 implements MigrationInterface {
  name = 'UserRolesArray1694281599265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_2c98da123a42aff01db972e0a71"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_user_role_user" ("userId" uuid NOT NULL, "roleUserId" integer NOT NULL, CONSTRAINT "PK_88cd2e83280a4d25ec85fc649e5" PRIMARY KEY ("userId", "roleUserId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eff12b6e8c36fab9e05aa7069d" ON "user_roles_user_role_user" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a45d9e9283559854b23bac03cb" ON "user_roles_user_role_user" ("roleUserId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role_user" ADD CONSTRAINT "FK_eff12b6e8c36fab9e05aa7069d7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role_user" ADD CONSTRAINT "FK_a45d9e9283559854b23bac03cbe" FOREIGN KEY ("roleUserId") REFERENCES "role_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role_user" DROP CONSTRAINT "FK_a45d9e9283559854b23bac03cbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role_user" DROP CONSTRAINT "FK_eff12b6e8c36fab9e05aa7069d7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a45d9e9283559854b23bac03cb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eff12b6e8c36fab9e05aa7069d"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_user_role_user"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_2c98da123a42aff01db972e0a71" FOREIGN KEY ("roleUserId") REFERENCES "role_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
