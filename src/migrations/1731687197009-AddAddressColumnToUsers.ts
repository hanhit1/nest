import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressColumnToUsers1731687197009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user
            ADD COLUMN address varchar(50) default 'DN'
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user
            DROP COLUMN address
            `)
    }

}
