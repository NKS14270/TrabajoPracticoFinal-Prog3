function CerrarSesion(){
    localStorage.removeItem("Usuario");
    localStorage.removeItem("id");
    window.location.href = "../Login/index.html";
}