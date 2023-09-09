import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoles1694284740599 implements MigrationInterface {
    name = 'UserRoles1694284740599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roleUserId" TO "roleUser"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roleUser" TO "roleUserId"`);
    }

}
