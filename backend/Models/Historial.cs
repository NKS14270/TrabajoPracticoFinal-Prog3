namespace backend.Models
{
    public class Historial
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int MonedaId { get; set; }
        public double Cantidad { get; set; }
        public DateTime Fecha { get; set; }
        public double Cotizacion { get; set; }
        public Usuario? Usuario { get; set; }
        public Moneda? Moneda { get; set; }
    }
}
