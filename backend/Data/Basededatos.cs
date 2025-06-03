using Microsoft.EntityFrameworkCore;
using backend.Models;
namespace backend.Data
{
    public class Basededatos : DbContext
    {
            public Basededatos(DbContextOptions<Basededatos> options) : base(options)
            {
            }
            public DbSet<Usuario> Usuarios { get; set; }
            public DbSet<Historial> Historiales { get; set; }
        public DbSet<Moneda> Monedas { get; set; }
    }
}
