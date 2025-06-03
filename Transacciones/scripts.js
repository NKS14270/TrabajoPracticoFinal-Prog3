document.getElementById("montoars").addEventListener("input", function () {
    const montoARS = parseFloat(this.value);
    const cripto = document.getElementById("criptomoneda").value;
    const precioCripto = precios[cripto];

    let cantidadCripto = "";
    if (!isNaN(montoARS) && montoARS > 0 && precioCripto) {
        console.log(cripto)
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
