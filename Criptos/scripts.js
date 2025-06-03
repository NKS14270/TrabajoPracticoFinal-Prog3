function CargarPrecios(moneda) {
    fetch(`https://criptoya.com/api/${moneda}/ARS/1`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los precios.');
            }
            return response.json();
        })
        .then(data => {
            const infoCriptos = document.getElementById("infocriptos");
            let html = "";
            Object.entries(data)
                .sort((a, b) => a[1].totalAsk - b[1].totalAsk)
                .forEach(([key, Cripto]) => {
                    if (Cripto.totalAsk === 0) return;
                    html += `
                        <tr>
                            <td>${key}</td>
                            <td>$${DarleFormatoNumeros(Cripto.totalAsk)} ARS</td>
                            <td>${new Date().toLocaleString()}</td>
                        </tr>`;
                });
            infoCriptos.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("infocriptos").innerHTML = "No se pudieron cargar los precios.";
        });
}

let intervaloPrecios;

function IniciarActualizacionPrecios(moneda) {
    if (intervaloPrecios) {
        clearInterval(intervaloPrecios);
    }
    CargarPrecios(moneda);
    intervaloPrecios = setInterval(() => CargarPrecios(moneda), 30000);
}

function DarleFormatoNumeros(num) {
    return num.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


