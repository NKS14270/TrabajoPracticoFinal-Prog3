using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ArregloBD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cripto",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "Cripto",
                table: "Historiales");

            migrationBuilder.DropColumn(
                name: "TipoOperacion",
                table: "Historiales");

            migrationBuilder.AddColumn<int>(
                name: "MonedaId",
                table: "Wallets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<double>(
                name: "Cantidad",
                table: "Historiales",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AddColumn<double>(
                name: "Cotizacion",
                table: "Historiales",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "MonedaId",
                table: "Historiales",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Moneda",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false),
                    Abreviatura = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moneda", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Wallets_MonedaId",
                table: "Wallets",
                column: "MonedaId");

            migrationBuilder.CreateIndex(
                name: "IX_Historiales_MonedaId",
                table: "Historiales",
                column: "MonedaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Historiales_Moneda_MonedaId",
                table: "Historiales",
                column: "MonedaId",
                principalTable: "Moneda",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Wallets_Moneda_MonedaId",
                table: "Wallets",
                column: "MonedaId",
                principalTable: "Moneda",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Historiales_Moneda_MonedaId",
                table: "Historiales");

            migrationBuilder.DropForeignKey(
                name: "FK_Wallets_Moneda_MonedaId",
                table: "Wallets");

            migrationBuilder.DropTable(
                name: "Moneda");

            migrationBuilder.DropIndex(
                name: "IX_Wallets_MonedaId",
                table: "Wallets");

            migrationBuilder.DropIndex(
                name: "IX_Historiales_MonedaId",
                table: "Historiales");

            migrationBuilder.DropColumn(
                name: "MonedaId",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "Cotizacion",
                table: "Historiales");

            migrationBuilder.DropColumn(
                name: "MonedaId",
                table: "Historiales");

            migrationBuilder.AddColumn<string>(
                name: "Cripto",
                table: "Wallets",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<decimal>(
                name: "Cantidad",
                table: "Historiales",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AddColumn<string>(
                name: "Cripto",
                table: "Historiales",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TipoOperacion",
                table: "Historiales",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
