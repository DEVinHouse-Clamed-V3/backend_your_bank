import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ClientsTable1744150358351 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clients",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            type: "int",
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            length: "200",
            isUnique: true,
          },
          {
            name: "gender",
            type: "enum",
            enum: ["M", "F"],
            isNullable: false,
          },
          {
            name: "income",
            type: "decimal",
            isNullable: false,
            precision: 10,
            scale: 2,
            default: 0
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
        "clients",
        new TableForeignKey({
          columnNames: ["user_id"],
          referencedTableName: "users",
          referencedColumnNames: ["id"],
          onDelete: "CASCADE",
        })
      );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clients");
  }
}
