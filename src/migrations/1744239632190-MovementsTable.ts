import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class MovementsTable1744239632190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movements",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            type: "int",
            generationStrategy: "increment",
          },
          {
            name: "client_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "value",
            type: "decimal",
            isNullable: false,
            precision: 10,
            scale: 2,
          },
          {
            name: "type",
            type: "enum",
            enum: ["SAIDA", "ENTRADA"],
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
            length: "200",
          },
          {
            name: "balance",
            type: "decimal",
            isNullable: false,
            precision: 10,
            scale: 2,
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
      "movements",
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movements");
  }
}
