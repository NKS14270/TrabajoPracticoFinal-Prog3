window.onload = async function () {
    var usuario = localStorage.getItem("Usuario");
    if (usuario) {
        window.location.href = "../index.html";
        alert('Ya Tienes Una Sesion Iniciada')
    }
    else{


        document.getElementById("login-form").addEventListener("submit", function (e) {
            e.preventDefault();
            
            var usuario = document.getElementById("usuario").value.trim();
            var password = document.getElementById("password").value.trim();
            
            fetch("https://localhost:7044/Cripto/Login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Nombre: usuario, password: password })
            })
            .then(response => {
                if (!response.ok) {
                    document.getElementById("errorlogin").innerHTML = response.status === 401 ?
                    "Usuario o contraseña incorrectos." :
                    "Error al iniciar sesión. Por favor, intenta nuevamente.";
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    localStorage.setItem("Usuario", usuario);
                    window.location.href = "../index.html";
                } else {
                    throw new Error('Token no recibido. Por favor, intenta nuevamente.');
                }
            })
        })
    }
    }


function CargarParaRegistrarse(){
        document.getElementById("login-title").innerHTML = "REGISTRARSE";
        document.getElementById("RegisterOrLogin").innerHTML = `
        ¿Tienes cuenta? 
        <a style="color: blue; cursor: pointer;" onclick="location.reload()">Loguearse</a>
        `;
        document.getElementById("botonsesion").innerHTML = "REGISTRARSE";
        document.getElementById("botonsesion").onclick = function (e) {
            e.preventDefault();
            RegistrarUsuario();
        };
}

function RegistrarUsuario(){

    var usuario = document.getElementById("usuario").value.trim();
    var password = document.getElementById("password").value.trim();

    fetch("https://localhost:7044/Cripto/Registrar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Nombre: usuario, password: password })
            })
            .then(response => {
                if (!response.ok) {
                    document.getElementById("errorlogin").innerHTML = response.status === 401
                    "Usuario Existente";
                    return null;
                }
                alert ("Usuario Creado Correctamente")
            })
        }
