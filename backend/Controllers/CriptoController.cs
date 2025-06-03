using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Controllers
{
    public class CriptoController : Controller
    {
        private readonly Basededatos _context;
        public CriptoController(Basededatos context)
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
            if (usuarioExistente != null)
            {
                return Ok(usuarioExistente);
            }
            else
            {
                return StatusCode(401, "Usuario o contraseña incorrectos.");
            }
        }
        public IActionResult Registrar([FromBody] Usuario usuario)
        {
            if (usuario == null || string.IsNullOrEmpty(usuario.Nombre) || string.IsNullOrEmpty(usuario.Password))
            {
                return BadRequest("Usuario o contraseña no pueden estar vacíos.");
            }

            usuario.Password = usuario.Password.Trim();
            usuario.Nombre = usuario.Nombre.Trim();
            var usuarioExistente = _context.Usuarios
                .FirstOrDefault(u => u.Nombre == usuario.Nombre);
            try
            {
                if (usuarioExistente == null)
                {
                    _context.Usuarios.Add(usuario);
                    _context.SaveChanges();
                    return Ok("Usuario Creado Correctamente");
                }
                return StatusCode(401, "Usuario Existente.");

            }
            catch (Exception)
            {

                throw;
            }

        }

        public IActionResult RegistrarTransacciones(Historial transaccion, string User, bool venta)
        {
            if (transaccion == null || string.IsNullOrEmpty(transaccion.Cantidad.ToString()))
            {
                return BadRequest("No se puede hacer una transaccion vacía.");
            }
            if (User.Trim() == null || string.IsNullOrEmpty(User.Trim()))
            {
                return BadRequest("No se puede hacer una transaccion sin un usuario.");
            }
            var usuariotransaccion = _context.Usuarios
                .FirstOrDefault(u => u.Nombre == User);
            try
            {
                if (venta)
                {
                    if (transaccion.Cantidad >= 0.000000000000001)
                    {
                        _context.Historiales.Add(transaccion);
                        _context.SaveChanges();
                    }
                }
                else
                {
                    if (transaccion.Cantidad > 0.000000000000001)
                    {
                        // Obtener el total previo del historial para este usuario y moneda
                        var totalPrevio = _context.Historiales
                            .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == transaccion.MonedaId)
                            .Sum(h => h.Cantidad);

                        var wallet = _context.Wallets
                            .FirstOrDefault(w => w.UsuarioId == usuariotransaccion.Id && w.MonedaId == transaccion.MonedaId);

                        if (wallet == null || wallet.Cantidad < (decimal)transaccion.Cantidad)
                        {
                            return BadRequest("No tienes suficiente saldo para realizar la compra.");
                        }

                        _context.Historiales.Add(transaccion);

                        wallet.Cantidad -= (decimal)transaccion.Cantidad;

                        _context.SaveChanges();

                        return Ok(new { TotalPrevio = totalPrevio });
                    }
                    else
                    {
                        return BadRequest("La cantidad debe ser mayor a cero.");
                    }
                }
                    return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public IActionResult DatosUsuario(string usuario)
        {
            if (string.IsNullOrWhiteSpace(usuario))
            {
                return BadRequest("El nombre de usuario no puede estar vacío.");
            }
            try
            {
                var datos = _context.Wallets
                    .Include(u => u.Usuario)
                    .Include(u => u.Moneda)
                    .Where(u => u.Usuario.Nombre == usuario)
                    .ToList();
                return Ok(datos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener los datos: " + ex.Message);
            }
        }
    }
}
