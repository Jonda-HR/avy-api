import { MigrationInterface, QueryRunner } from "typeorm";

export class DinnerModule1694380529682 implements MigrationInterface {
    name = 'DinnerModule1694380529682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "isPaid" boolean NOT NULL DEFAULT false, "dinnerId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_2ebff7c458ed09689a53242fec3" UNIQUE ("code"), CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dinner" ("id" SERIAL NOT NULL, "dinnerName" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "raisedMoney" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_8beea5c2d6f109f0f3142abb4f2" UNIQUE ("dinnerName"), CONSTRAINT "PK_3cf95e3b2675b39ab9dbcbd639a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_a9128bde9860f11a6b4f32b1081" FOREIGN KEY ("dinnerId") REFERENCES "dinner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_a9128bde9860f11a6b4f32b1081"`);
        await queryRunner.query(`DROP TABLE "dinner"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
