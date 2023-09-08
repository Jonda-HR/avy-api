import { MigrationInterface, QueryRunner } from "typeorm";

export class UserModule1694199041218 implements MigrationInterface {
    name = 'UserModule1694199041218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "roleUserId" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_user" ("id" SERIAL NOT NULL, "roleUserName" character varying NOT NULL, CONSTRAINT "UQ_d578b8c36b12fdad831cdb5f0e4" UNIQUE ("roleUserName"), CONSTRAINT "PK_e3583d40265174efd29754a7c57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_group" ADD CONSTRAINT "UQ_d689a9a439d9d4f36aa44dd4659" UNIQUE ("roleGroupName")`);
        await queryRunner.query(`ALTER TABLE "role_ministry" ADD CONSTRAINT "UQ_2527f031fce3688f7f113bb8f6f" UNIQUE ("roleMinistryName")`);
        await queryRunner.query(`ALTER TABLE "sector" ADD CONSTRAINT "UQ_7bc6e745aae79101fe1f7eedb89" UNIQUE ("sectorName")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2c98da123a42aff01db972e0a71" FOREIGN KEY ("roleUserId") REFERENCES "role_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2c98da123a42aff01db972e0a71"`);
        await queryRunner.query(`ALTER TABLE "sector" DROP CONSTRAINT "UQ_7bc6e745aae79101fe1f7eedb89"`);
        await queryRunner.query(`ALTER TABLE "role_ministry" DROP CONSTRAINT "UQ_2527f031fce3688f7f113bb8f6f"`);
        await queryRunner.query(`ALTER TABLE "role_group" DROP CONSTRAINT "UQ_d689a9a439d9d4f36aa44dd4659"`);
        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
