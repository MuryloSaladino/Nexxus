import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740484965993 implements MigrationInterface {
    name = 'Migration1740484965993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userInChargeId" uuid, "clientDepartment" character varying(100) NOT NULL, "benefit" numeric(10,2), "investment" numeric(10,2), "status" character varying NOT NULL, "priority" character varying NOT NULL, "description" text NOT NULL, "justification" text NOT NULL, "orchestration" text NOT NULL, CONSTRAINT "PK_05589f12803f420b119df2f6170" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying(20) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD CONSTRAINT "FK_eb533808168ebcd7b7679307011" FOREIGN KEY ("userInChargeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solutions" DROP CONSTRAINT "FK_eb533808168ebcd7b7679307011"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "solutions"`);
    }

}
