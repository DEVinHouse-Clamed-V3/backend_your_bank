import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UsersTable1744069885143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        isPrimary: true,
                        isGenerated: true,
                        type: "int",
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                        length: "200"
                    },
                    {
                        name: "document",
                        type: "varchar",
                        isNullable: false,
                        length: "14",
                        isUnique: true
                    },
                    {
                        name: "password_hash",
                        type: "varchar",
                        isNullable: false,
                        length: "200"
                    },
                    {
                        name: "status",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
            }),
            true,
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
