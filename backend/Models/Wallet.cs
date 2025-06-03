namespace backend.Models
{
    public class Wallet
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int MonedaId { get; set; }
        public decimal Cantidad { get; set; }
        public Usuario? Usuario { get; set; }
        public Moneda? Moneda { get; set; }
    }
}
