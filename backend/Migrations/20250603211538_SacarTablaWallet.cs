using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SacarTablaWallet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Historiales_Moneda_MonedaId",
                table: "Historiales");

            migrationBuilder.DropTable(
                name: "Wallets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Moneda",
                table: "Monedas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Monedas",
                table: "Monedas",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Historiales_Monedas_MonedaId",
                table: "Historiales",
                column: "MonedaId",
                principalTable: "Monedas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Historiales_Monedas_MonedaId",
                table: "Historiales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Monedas",
                table: "Monedas");

            migrationBuilder.RenameTable(
                name: "Monedas",
                newName: "Moneda");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Moneda",
                table: "Moneda",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Wallets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MonedaId = table.Column<int>(type: "INTEGER", nullable: false),
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: false),
                    Cantidad = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wallets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Wallets_Moneda_MonedaId",
                        column: x => x.MonedaId,
                        principalTable: "Moneda",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Wallets_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Wallets_MonedaId",
                table: "Wallets",
                column: "MonedaId");

            migrationBuilder.CreateIndex(
                name: "IX_Wallets_UsuarioId",
                table: "Wallets",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Historiales_Moneda_MonedaId",
                table: "Historiales",
                column: "MonedaId",
                principalTable: "Moneda",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
