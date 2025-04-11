import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreditsCardsTable1744321520280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "credit_cards",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    }, 
                    {
                        name: "client_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "placeholder",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "number",
                        type: "varchar",
                        length: "16",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "cvv",
                        type: "varchar",
                        length: "3",
                        isNullable: true,
                    },
                    {
                        name: "expiration_date",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "limit",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "credit_cards",
            new TableForeignKey({
                columnNames: ["client_id"],
                referencedTableName: "clients",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("credit_cards");
    }
}