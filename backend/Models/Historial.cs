namespace backend.Models
{
    public class Historial
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int MonedaId { get; set; }
        public decimal Cantidad { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Cotizacion { get; set; }
        public Usuario? Usuario { get; set; }
        public Moneda? Moneda { get; set; }
    }
}
