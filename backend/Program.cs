using backend.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Habilitar Razor Pages adem�s de controladores con vistas
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

// Configuraci�n de la cadena de conexi�n
string? cadena = builder.Configuration.GetConnectionString("DefaultConnectionSqLite");

// Registrar DbContext antes de construir la app
builder.Services.AddDbContext<Basededatos>(options =>
    options.UseSqlite(cadena));

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configuraci�n del pipeline HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();


// Mapear rutas de controladores
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();