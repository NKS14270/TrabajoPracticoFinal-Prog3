window.onload = async function () {
    var usuario = localStorage.getItem("Usuario");
    if (!usuario) {
        window.location.href = "/Login/index.html";
    } else{ IniciarActualizacionPrecios(usuario);}
}

async function CargarPrecio(usuario) {
    try {
        const response = await fetch(`https://localhost:7044/Cripto/DatosUsuario?usuario=${usuario}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                console.log("Error al obtener datos del usuario");
                return;
            }
            
            const datos = await response.json();
            
            if (datos) {
                document.getElementById("Info-Nombre").innerHTML = `Bienvenido Nuevamente ${usuario}`;
                
                let TotalBTC = 0;
                let TotalETH = 0;
                let TotalLTC = 0;
                let TotalUSDT = 0;
                let TotalUSDC = 0;
                let TotalARS = 0;
                for (const wallet of datos) {
                    if  (wallet.monedaId == 1){
                            const precio = await CalcularPrecio(wallet.abreviatura);
                            const subtotal = precio * wallet.total;
                            TotalBTC = subtotal;
                            document.getElementById("Lista-BTC").innerHTML = `<td>${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} BTC</td>
                                                        <td>$${DarleFormatoNumeros(TotalBTC)} ARS</td>`;
                    }
                    if(wallet.monedaId == 2){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                            const subtotal = precio * wallet.total;
                            TotalETH = subtotal;
                            document.getElementById("Lista-ETH").innerHTML = `<td>${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} ETH</td>
                                                        <td>$${DarleFormatoNumeros(TotalETH)} ARS</td>`;
                    }
                    if(wallet.monedaId == 3){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                            const subtotal = precio * wallet.total;
                            TotalLTC = subtotal;
                            document.getElementById("Lista-LTC").innerHTML = `<td>${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} LTC</td>
                                                        <td>$${DarleFormatoNumeros(TotalLTC)} ARS</td>`;
                    }
                    if(wallet.monedaId == 4){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                            const subtotal = precio * wallet.total;
                            TotalUSDT = subtotal;
                            document.getElementById("Lista-USDT").innerHTML = `<td>${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} USDT</td>
                                                        <td>$${DarleFormatoNumeros(TotalUSDT)} ARS</td>`;
                    }
                    if(wallet.monedaId == 5){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                        const subtotal = precio * wallet.total;
                        TotalUSDC += subtotal;
                        document.getElementById("Lista-USDC").innerHTML = `<td>${wallet.nombre} (${wallet.abreviatura})</td>
                                                                            <td>${wallet.total} USDC</td>
                                                                            <td>$${DarleFormatoNumeros(TotalUSDC)} ARS</td>`
                        }
                        if(wallet.monedaId == 6){    
                            TotalARS = wallet.total;
                            document.getElementById("Lista-ARS").innerHTML = `<td>${wallet.nombre} (${wallet.abreviatura})</td>
                                <td>$${DarleFormatoNumeros(wallet.total)} ARS</td>
                                <td>$${DarleFormatoNumeros(TotalARS)} ARS</td>`
                            }
                    }
                    }
                    
                    Total =TotalARS + TotalBTC + TotalETH + TotalLTC + TotalUSDC + TotalUSDT;
                    document.getElementById("Info-Saldo").innerHTML = `$ ${DarleFormatoNumeros(Total)} ARS`;
                    }
        catch (error) {
            console.log("Error general:", error);
        }
    }

let intervaloPrecios;

function IniciarActualizacionPrecios(usuario) {
    if (intervaloPrecios) {
        clearInterval(intervaloPrecios);
    }
    CargarPrecio(usuario);
    intervaloPrecios = setInterval(() => CargarPrecio(usuario), 5000);
}

function DarleFormatoNumeros(num) {
    return num.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


async function CalcularPrecio(moneda) {
    try {
        const response = await fetch(`https://criptoya.com/api/binance/${moneda}/ARS/1`);
        if (!response.ok) {
            console.log("Error al obtener precio de cripto");
            return 0;
        }
        const datos = await response.json();
        return datos.totalAsk; 
    } catch (error) {
        console.log("Error en la API de precio:", error);
        return 0;
    }
}