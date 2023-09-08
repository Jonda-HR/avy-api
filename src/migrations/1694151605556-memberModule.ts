import { MigrationInterface, QueryRunner } from 'typeorm';

export class MemberModule1694151605556 implements MigrationInterface {
  name = 'MemberModule1694151605556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role_group" ("id" SERIAL NOT NULL, "roleGroupName" character varying NOT NULL, CONSTRAINT "PK_34c9ec7c7758943fddc2b13d859" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "member" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "identityNumber" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "phone" character varying NOT NULL, "address" character varying, "roleGroupId" integer NOT NULL, "roleMinistryId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_ministry" ("id" SERIAL NOT NULL, "roleMinistryName" character varying NOT NULL, CONSTRAINT "PK_ca359b0c006ac4123c116ec8366" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_b0215b440aa5860d9d3262898a0" FOREIGN KEY ("roleGroupId") REFERENCES "role_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_b5480473f904b6509ceb4145ea6" FOREIGN KEY ("roleMinistryId") REFERENCES "role_ministry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "FK_b5480473f904b6509ceb4145ea6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "FK_b0215b440aa5860d9d3262898a0"`,
    );
    await queryRunner.query(`DROP TABLE "role_ministry"`);
    await queryRunner.query(`DROP TABLE "member"`);
    await queryRunner.query(`DROP TABLE "role_group"`);
  }
}
