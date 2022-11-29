import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669765660076 implements MigrationInterface {
    name = 'default1669765660076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" text NOT NULL, "phone" text, "address" text NOT NULL, "loyalty" integer NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
