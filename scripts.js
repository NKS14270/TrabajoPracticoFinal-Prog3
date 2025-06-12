window.onload = async function () {
    var usuario = localStorage.getItem("Usuario");
    var id = localStorage.getItem("id");
    if (!usuario || !id) {
        console.log("Usuario o ID no encontrado, redirigiendo a la página de inicio de sesión.");
        localStorage.removeItem("Usuario");
        localStorage.removeItem("id");
        window.location.href = "/Login/index.html";
    } else{ 
        document.getElementById("Info-Nombre").innerHTML = `Bienvenido Nuevamente <span id="name">${usuario}</span>`;
        IniciarActualizacionPrecios(usuario);}
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
                
                let TotalBTC = 0;
                let TotalETH = 0;
                let TotalLTC = 0;
                let TotalUSDT = 0;
                let TotalUSDC = 0;
                let TotalARS = 0;

                for (const wallet of datos) {
                    if  (wallet.monedaId == 1){
                            const precio = await CalcularPrecio(wallet.abreviatura);
                            TotalBTC = precio * wallet.total;
                            document.getElementById("Lista-BTC").innerHTML = `<td><img id="logocripto" src="./img/${wallet.abreviatura}-logo.svg"> </img> ${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} BTC</td>
                                                        <td>$${DarleFormatoNumeros(TotalBTC)} ARS</td>
                                                        <td><a id="BtnHistorial" onclick="CargarHistorial(1)">Cargar Historial</a></td>`;
                    }
                    if(wallet.monedaId == 2){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                            TotalETH = precio * wallet.total;
                            document.getElementById("Lista-ETH").innerHTML = `<td><img id="logocripto" src="./img/${wallet.abreviatura}-logo.svg"> </img>${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} ETH</td>
                                                        <td>$${DarleFormatoNumeros(TotalETH)} ARS</td>
                                                        <td><a id="BtnHistorial" onclick="CargarHistorial(2)">Cargar Historial</a></td>
`;
                    }
                    if(wallet.monedaId == 3){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                            TotalLTC = precio * wallet.total;
                            document.getElementById("Lista-LTC").innerHTML = `<td><img id="logocripto" src="./img/${wallet.abreviatura}-logo.svg"> </img>${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} LTC</td>
                                                        <td>$${DarleFormatoNumeros(TotalLTC)} ARS</td>
                                                        <td><a id="BtnHistorial" onclick="CargarHistorial(3)">Cargar Historial</a></td>
`;
                    }
                    if(wallet.monedaId == 4){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                            TotalUSDT = precio * wallet.total;
                            document.getElementById("Lista-USDT").innerHTML = `<td><img id="logocripto" src="./img/${wallet.abreviatura}-logo.svg"> </img>${wallet.nombre} (${wallet.abreviatura})</td>
                                                        <td>${wallet.total} USDT</td>
                                                        <td>$${DarleFormatoNumeros(TotalUSDT)} ARS</td>
                                                        <td><a id="BtnHistorial" onclick="CargarHistorial(4)">Cargar Historial</a></td>
`;
                    }
                    if(wallet.monedaId == 5){
                        const precio = await CalcularPrecio(wallet.abreviatura);
                        TotalUSDC = precio * wallet.total;
                        document.getElementById("Lista-USDC").innerHTML = `<td><img id="logocripto" src="./img/${wallet.abreviatura}-logo.svg"> </img>${wallet.nombre} (${wallet.abreviatura})</td>
                                                                            <td>${wallet.total} USDC</td>
                                                                            <td>$${DarleFormatoNumeros(TotalUSDC)} ARS</td>
                                                                            <td><a id="BtnHistorial" onclick="CargarHistorial(5)">Cargar Historial</a></td>
`
                        }
                        if(wallet.monedaId == 6){   

                            TotalARS = wallet.total;
                            document.getElementById("Lista-ARS").innerHTML = `<td>
                            <svg fill="none" viewBox="0 0 96 96" class="svg-icon" id="logocripto" style=""> <title></title> <path fill="#FFC800" d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48"></path><path fill="#276304" d="M79.2 67.32v-4.56l.04.04c5.52-1 8.64-4.88 8.64-10.16 0-6.6-5.56-8.64-9.72-10.16-2.84-1.04-4.68-1.92-4.68-3.68 0-1.48 1.08-2.6 3.32-2.6s4.84.84 6.88 2.68l3.6-5.88c-2.16-1.88-4.96-3.12-8.08-3.56v-4.56h-5.12v4.64c-5.64.96-8.72 5.12-8.72 9.68 0 6.657 5.28 8.558 9.427 10.05l.413.15c2.72 1.04 4.64 1.96 4.64 3.92 0 1.6-1.4 2.84-3.76 2.84-3.12 0-6-1.44-7.92-3.48l-3.76 6.08c2.4 2.32 5.48 3.76 9.68 4.16v4.4z"></path><path fill="#276304" fill-rule="evenodd" d="m27.8 62.4-1.24-5.08H16.52l-1.24 5.08H7.16l9.64-32.6h9.52l9.64 32.6zm-6.2-25.68-3.48 13.8h6.96zM53.36 62.4l-4.32-11.24h-2.92V62.4H38.2V29.8h13.28c6.36 0 10.4 4.6 10.4 10.6 0 5.52-2.84 8.32-5.28 9.4l5.52 12.6zm-3.08-25.8h-4.16v7.76h4.16c2.12 0 3.6-1.52 3.6-3.88s-1.52-3.92-3.6-3.92z" clip-rule="evenodd"></path><!----></svg>
                             ${wallet.nombre} (${wallet.abreviatura})</td>
                                <td>$${DarleFormatoNumeros(wallet.total)} ARS</td>
                                <td>$${DarleFormatoNumeros(TotalARS)} ARS</td>
                                <td><a id="BtnHistorial" onclick="CargarHistorial(6)">Cargar Historial</a></td>
`
                            }
                    }
                    Total = TotalARS + TotalBTC + TotalETH + TotalLTC + TotalUSDC + TotalUSDT
                    document.getElementById("Info-Saldo").innerHTML = `$ ${DarleFormatoNumeros(Total)} ARS`;
                    }
                    
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


// Funcionalidad del modal
const modal = document.getElementById('modal-historial');
const closeModal = document.querySelector('.close-modal');

function showModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling
}

closeModal.addEventListener('click', hideModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        hideModal();
    }
});

function CargarHistorial(id) {
    const idUsuario = localStorage.getItem("id")

    fetch(`https://localhost:7044/Cripto/HistorialTransaccion?idmoneda=${id}&idusuario=${idUsuario}`,{
    method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el Historial.');
            }
            return response.json();
        })
        .then(data => {
            const Historial = document.getElementById("historial-list");
            let html = "";
            data.forEach(transaccion => {
                const decimales = ['ARS', 'USDT', 'USDC'].includes(transaccion.moneda.abreviatura) ? 2 : 12;
                if (transaccion.cantidad < 0 ) {
                    html += `<li class="historial-item">
                                <span class="historial-fecha">${formatearFecha(transaccion.fecha)}</span>
                                <span class="historial-cantidad">${transaccion.cantidad.toFixed(decimales)} ${transaccion.moneda.abreviatura} </span>
                                <span class="historial-monto negativo">$${transaccion.cotizacion} ARS</span>
                            </li>`
                }
                else{
                    html += `<li class="historial-item">
                                <span class="historial-fecha">${formatearFecha(transaccion.fecha)}</span>
                                <span class="historial-cantidad">${transaccion.cantidad.toFixed(decimales)} ${transaccion.moneda.abreviatura} </span>
                                <span class="historial-monto positivo">$${transaccion.cotizacion} ARS</span>
                            </li>`
                }    
            })
            Historial.innerHTML = html;
            showModal();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("infocriptos").innerHTML = "No se pudo cargar el historial.";
        });
}

function formatearFecha(fechaIso) {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'medium' });
}