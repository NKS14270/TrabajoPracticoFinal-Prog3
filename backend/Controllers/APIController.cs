using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    public class APIController : ControllerBase
    {
        private readonly Basededatos _context;
        public APIController(Basededatos context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] Usuario usuario)
        {

            if (usuario == null || string.IsNullOrEmpty(usuario.Nombre) || string.IsNullOrEmpty(usuario.Password))
            {
                return BadRequest("Usuario o contraseña no pueden estar vacíos.");
            }
            usuario.Password = usuario.Password.Trim();
            usuario.Nombre = usuario.Nombre.Trim();
            var usuarioExistente = _context.Usuarios
                .FirstOrDefault(u => u.Nombre == usuario.Nombre && u.Password == usuario.Password);
            if (usuarioExistente.Nombre == usuario.Nombre)
            {
                return Ok();

            }
            else
            {
                return BadRequest("Usuario o contraseña incorrectos.");
            }
        }
        public IActionResult Monedas()
        {
            try
            {
                var monedas = _context.Monedas
                    .Include(m => m.Abreviatura)
                    .ToList();
                return Ok(monedas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener las monedas: " + ex.Message);
            }
        }

    }
}
