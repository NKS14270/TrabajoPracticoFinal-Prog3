document.getElementById("montoars").addEventListener("input", function () {
    const montoARS = parseFloat(this.value);
    const cripto = document.getElementById("criptomoneda").value;
    const precioCripto = precios[cripto];

    let cantidadCripto = "";
    if (!isNaN(montoARS) && montoARS > 0 && precioCripto) {
        if  (cripto == "USDT" || cripto == "USDC")
        {
                    cantidadCripto = (montoARS / precioCripto).toFixed(2);
        }
        else{
                    cantidadCripto = (montoARS / precioCripto).toFixed(12);
        }
    }
    document.getElementById("montocripto").value = cantidadCripto;
});

document.getElementById("criptomoneda").addEventListener("change", function () {
    const montoARS = parseFloat(document.getElementById("montoars").value);
    const cripto = this.value;
    const precioCripto = precios[cripto];

    let cantidadCripto = "";
    if (!isNaN(montoARS) && montoARS > 0 && precioCripto) {
        if  (cripto == "USDT" || cripto == "USDC")
        {
                    cantidadCripto = (montoARS / precioCripto).toFixed(2);
        }
        else{
                    cantidadCripto = (montoARS / precioCripto).toFixed(12);

        }
    }
    document.getElementById("montocripto").value = cantidadCripto;
});

const precios = {
    BTC: 0,
    LTC : 0,
    ETH: 0,
    USDT: 0,
    USDC: 0
};

window.onload = async function () {
    var usuario = localStorage.getItem("Usuario");
    if  (!usuario){
        window.location.href = "../index.html";
    }
    else{

        for (const moneda of Object.keys(precios)) {
            const precio = await ObtenerPrecio(moneda);
            if (precio) {
                precios[moneda] = precio;
            }
        }
    }
};
async function ObtenerPrecio(moneda) {
    try {
        const response = await fetch(`https://criptoya.com/api/binance/${moneda}/ARS/1`);
        if (!response.ok) {
            console.log("Error al obtener precio de cripto");
            return 0;
        }
        const datos = await response.json();
        return datos.ask;
    } catch (error) {
        console.log("Error en la API de precio:", error);
        return 0;
    }
}

async function procesarOperacion(){
    
    var IdMoneda = 0;
    const cripto = document.getElementById("criptomoneda").value;
    const montoARS = parseFloat(document.getElementById("montoars").value);
    const cantidadcriptos = document.getElementById("montocripto").value;
    const venta = document.getElementById("tipoOperacion").value;



    
await fetch(`https://localhost:7044/Cripto/Moneda?Abreviatura=${cripto}`)
.then(response => {
            if (!response.ok) {
                console.log('Error el id de la moneda');
            }
            return response.json();
        })
        .then(data => {       
            IdMoneda = data.id;
            RealizarTransaccion(IdMoneda,cripto,montoARS,cantidadcriptos,venta)
        })
        .catch(error => {
            console.error('Error:', error);
        });
       
        }

async function RealizarTransaccion(IdMoneda,cripto,montoARS,cantidadcriptos,Venta){
                const precioCripto = precios[cripto];
                const usuarioId = localStorage.getItem("id");

                console.log(Venta,montoARS,cantidadcriptos,precioCripto,usuarioId)

            if (!usuarioId) {
                alert("No se encontró el ID del usuario. Por favor, inicie sesión nuevamente.");
                window.location.href = "../index.html";
                return;
            }

            if(!isNaN(montoARS) && montoARS > 0)
                {
                    await fetch(`https://localhost:7044/Cripto/RegistrarTransacciones?venta=${Venta}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            UsuarioId: usuarioId,
                            MonedaId: IdMoneda,
                            Cantidad: cantidadcriptos,
                            Fecha: new Date().toISOString(),
                            Cotizacion: montoARS
                        })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al Hacer la transaccion');
                        }
                        return response.json();
                    })
                    .then (data => {
                        alert(data)
                    })
                }
                else{
                    alert("No se puede hacer una transaccion vacia")
                }
            }


function AgregarARS(){
    const usuarioId = localStorage.getItem("id");

    fetch(`https://localhost:7044/Cripto/AgregarARS?idusuario=${usuarioId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al Agregar Dinero');
                        }
                        return response.json();
                    })
                    .then (data => {
                        alert("Agregado correctamente")
                    })
}
