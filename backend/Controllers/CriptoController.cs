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

    public IActionResult RegistrarTransacciones([FromBody]Historial transaccion, bool venta)
        {
            if (transaccion == null || string.IsNullOrEmpty(transaccion.Cantidad.ToString()))
            {
                return BadRequest("No se puede hacer una transaccion vacía.");
            }
            var usuariotransaccion = _context.Usuarios
                .FirstOrDefault(u => u.Id == transaccion.UsuarioId);
            try
            {
                    if (venta)
                    {
                        if (transaccion.Cantidad >= 0.000000000000001)
                        {
                            var saldoPrevioMoneda = _context.Historiales
                                .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == transaccion.MonedaId)
                                .Sum(h => h.Cantidad);

                            var saldoPrevioARS = _context.Historiales
                                .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == 6)
                                .Sum(h => h.Cantidad);

                            if (saldoPrevioMoneda < transaccion.Cantidad)
                            {
                                return BadRequest("No tienes suficiente saldo para realizar la venta.");
                            }

                            var transaccionVenta = new Historial
                            {
                                UsuarioId = usuariotransaccion.Id,
                                MonedaId = transaccion.MonedaId,
                                Cantidad = -transaccion.Cantidad,
                                Fecha = DateTime.Now,
                                Cotizacion = transaccion.Cotizacion
                            };
                            _context.Historiales.Add(transaccionVenta);

                            var transaccionARS = new Historial
                            {
                                UsuarioId = usuariotransaccion.Id,
                                MonedaId = 6,
                                Cantidad = transaccion.Cotizacion,
                                Fecha = DateTime.Now,
                                Cotizacion = transaccion.Cotizacion
                            };
                            _context.Historiales.Add(transaccionARS);

                            _context.SaveChanges();

                            var saldoActualARS = _context.Historiales
                                .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == 6)
                                .Sum(h => h.Cantidad);

                            return Ok(new { SaldoARS = saldoActualARS });
                        }
                        else
                        {
                            return BadRequest("La cantidad debe ser mayor a cero.");
                        }
                    }
                else
                {
                    if (transaccion.Cantidad > 0.000000000000001)
                    {
                        var saldoPrevioMoneda = _context.Historiales
                            .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == transaccion.MonedaId)
                            .Sum(h => h.Cantidad);
                        var saldoPrevioARS = _context.Historiales
                            .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == 6)
                            .Sum(h => h.Cantidad);

                        if (transaccion.MonedaId == 6)
                        {
                            if (saldoPrevioARS < transaccion.Cantidad)
                            {
                                return BadRequest("No tienes suficiente saldo en ARS para realizar la compra.");
                            }
                        }
                        else
                        {
                            if (saldoPrevioARS < transaccion.Cotizacion)
                            {
                                return BadRequest("No tienes suficiente saldo en ARS para realizar la compra.");
                            }
                        }

                        _context.Historiales.Add(transaccion);

                        if (transaccion.MonedaId != 6)
                        {
                            var movimientoARS = new Historial
                            {
                                UsuarioId = usuariotransaccion.Id,
                                MonedaId = 6,
                                Cantidad = -transaccion.Cotizacion,
                                Fecha = DateTime.Now,
                                Cotizacion = transaccion.Cotizacion
                            };
                            _context.Historiales.Add(movimientoARS);
                        }

                        _context.SaveChanges();
                        return Ok("Se ha vendido correctamente");
                    }
                    if (transaccion.Cantidad > 0.000000000000001)
                    {
                        var saldoPrevioMoneda = _context.Historiales
                            .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == transaccion.MonedaId)
                            .Sum(h => h.Cantidad);
                        var saldoPrevioARS = _context.Historiales
                            .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == 6)
                            .Sum(h => h.Cantidad);

                        if (transaccion.MonedaId == 6)
                        {
                            if (saldoPrevioARS < transaccion.Cantidad)
                            {
                                return BadRequest("No tienes suficiente saldo en ARS para realizar la compra.");
                            }
                        }
                        else
                        {
                            if (saldoPrevioARS < transaccion.Cotizacion)
                            {
                                return BadRequest("No tienes suficiente saldo en ARS para realizar la compra.");
                            }
                        }

                        _context.Historiales.Add(transaccion);
                        _context.SaveChanges();
                        return Ok(new { SaldoPrevioMoneda = saldoPrevioMoneda, SaldoPrevioARS = saldoPrevioARS });

                        var totalPrevio = _context.Historiales
                            .Where(h => h.UsuarioId == usuariotransaccion.Id && h.MonedaId == transaccion.MonedaId)
                            .Sum(h => h.Cantidad);

                        if (transaccion.MonedaId == 6)
                        {
                            if (totalPrevio < transaccion.Cantidad)
                            {
                                return BadRequest("No tienes suficiente saldo en ARS para realizar la compra.");
                            }
                        }
                        else
                        {
                            if (totalPrevio < transaccion.Cotizacion)
                            {
                                return BadRequest("No tienes suficiente saldo para realizar la compra.");
                            }
                        }

                        _context.Historiales.Add(transaccion);
                        _context.SaveChanges();

                        return Ok("Compra realizada correctamente");
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

        public IActionResult AgregarARS(int idusuario)
        {
            Historial historial = new Historial();
            historial.UsuarioId = idusuario;
            historial.Cantidad = 10000000;
            historial.Fecha = DateTime.Now;
            historial.MonedaId = 6;
            historial.Cotizacion = 10000000;

            _context.Historiales.Add(historial);
            _context.SaveChanges();
            return Ok();
        }



        [HttpGet]

        public IActionResult HistorialTransaccion(int idmoneda, int idusuario)
        {
            var lista = _context.Historiales
                .Include(m => m.Moneda)
                .Where(H => H.MonedaId == idmoneda && H.UsuarioId == idusuario)
                .OrderByDescending(H => H.Fecha)
                .ToList();

            return Ok(lista);
        }
        public IActionResult Moneda(string abreviatura) {
            var moneda = _context.Monedas
                .FirstOrDefault(m => m.Abreviatura == abreviatura);
            return Ok(moneda);
        }
        public IActionResult DatosUsuario(string usuario)
        {
            if (string.IsNullOrWhiteSpace(usuario))
            {
                return BadRequest("El nombre de usuario no puede estar vacío.");
            }
            try
            {
                var datos = _context.Historiales
                        .Include(h => h.Moneda)
                        .Include(h => h.Usuario)
                        .Where(h => h.Usuario.Nombre == usuario)
                        .GroupBy(h => new { h.MonedaId, h.Moneda.Nombre, h.Moneda.Abreviatura })
                        .Select(g => new
                        {
                            MonedaId = g.Key.MonedaId,
                            Nombre = g.Key.Nombre,
                            Abreviatura = g.Key.Abreviatura,
                            Total = g.Sum(h => h.Cantidad)
                        })
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
