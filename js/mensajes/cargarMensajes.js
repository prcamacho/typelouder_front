

function obtenerMensajesDelCanal(id_canal, nombre_canal) {
    // Realizar una solicitud GET a la URL deseada
    const h4h3Elements = document.querySelectorAll(".canales-clickleables");
    h4h3Elements.forEach(function(elementos) {
        elementos.addEventListener("click", function(event) {
            h4h3Elements.forEach(function(el) {
                el.classList.remove("clicked");
            });
            this.classList.add("clicked");


        });
    });


    const seccionDerecha = document.querySelector(".servidor-search");
    seccionDerecha.innerHTML = "";
    const divTituloCanal = document.createElement("div");
    divTituloCanal.className = 'canal-seleccionado';
    const contenedorMensajes = document.createElement("div");
    contenedorMensajes.className = 'contenedor-mensajes';
    const seccionMensajes = document.createElement("div");
    seccionMensajes.className = 'seccion-mensajes';
    //seccionMensajes.style.flexDirection = "column-reverse";
    const divInputMensaje = document.createElement("div");
    divInputMensaje.className = "send-mensaje";
    const formularioMensaje = document.createElement("form");
    formularioMensaje.className = "formulario-mensaje";
    const inputMensaje = document.createElement("input");
    inputMensaje.className = "input-mensaje";
    inputMensaje.placeholder = "Ingrese mensaje...";
    const botonMensaje = document.createElement("button");
    botonMensaje.className = "boton-mensaje";
    botonMensaje.type = "submit";
    const imgbotonmensaje = document.createElement("img");
    imgbotonmensaje.className = "img-boton-mensaje";
    imgbotonmensaje.src= "../static/imgs/boton-enviar.png"

    const h2TituloCanal = document.createElement("h2");
    h2TituloCanal.textContent = nombre_canal;
    h2TituloCanal.style.margin = "0px 15px";
    
    divTituloCanal.appendChild(h2TituloCanal);
    
    botonMensaje.appendChild(imgbotonmensaje);
    formularioMensaje.appendChild(inputMensaje);
    formularioMensaje.appendChild(botonMensaje);
    divInputMensaje.appendChild(formularioMensaje);


    fetch("http://127.0.0.1:8000/mensajes/" + id_canal, {
        method: "GET",
        credentials: "include" // Configura para incluir automáticamente las cookies si es necesario
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        return response.json(); // Si esperas una respuesta JSON
    })
    .then(data => {
        if (data[1] === 404){
            const noMensajes = document.createElement("h1");
            noMensajes.textContent = "Aún no hay mensajes"
            noMensajes.style.color = "#ccc";
            noMensajes.style.margin = "auto";
            seccionMensajes.appendChild(noMensajes);
        } else {
        data[0].forEach(function(mensaje) {
            const divTodoMensaje = document.createElement("div");
            const divImagenMensaje = document.createElement("div");
            const divContenedorMensaje = document.createElement("div");
            const divUsernameFecha = document.createElement("div");
            const divMensaje = document.createElement("div");
            
            divTodoMensaje.className = "div-todo-mensaje"
            divImagenMensaje.className = "div-imagen-mensaje";
            divContenedorMensaje.className = "div-contenedor-mensaje"
            divUsernameFecha.className = "div-username-fecha";
            divMensaje.className = "div-mensajes";
            
            const imgImagenUser = document.createElement("img");
            const h4Username = document.createElement("h4");
            const h5FechaHora = document.createElement("h5");

            imgImagenUser.className = "img-user-mensaje";
            h4Username.className = "h4-user-mensaje";
            h5FechaHora.className = "h5-fecha-hora";

            imgImagenUser.src = mensaje.usuario.imagen;
            h4Username.textContent = mensaje.usuario.username;
            h5FechaHora.textContent = mensaje.fecha_mensaje;
            divMensaje.textContent = mensaje.mensaje;


            const idUsuario = document.querySelector(".username-usuario");
            if (mensaje.usuario.id === parseInt(idUsuario.id)){
                divTodoMensaje.style.alignSelf = "end";
                divTodoMensaje.style.backgroundColor = "#010931";
                divTodoMensaje.style.flexDirection = "row-reverse";   
            }

            divUsernameFecha.appendChild(h4Username);
            divUsernameFecha.appendChild(h5FechaHora);
            divContenedorMensaje.appendChild(divUsernameFecha);
            divContenedorMensaje.appendChild(divMensaje);
            divImagenMensaje.appendChild(imgImagenUser);
            divTodoMensaje.appendChild(divImagenMensaje);
            divTodoMensaje.appendChild(divContenedorMensaje);
            seccionMensajes.appendChild(divTodoMensaje);
            contenedorMensajes.appendChild(seccionMensajes);
        });
    }
        //seccionMensajes.scrollTop = seccionMensajes.scrollHeight;
        seccionDerecha.appendChild(divTituloCanal);
        seccionDerecha.appendChild(seccionMensajes);
        seccionDerecha.appendChild(divInputMensaje);
        return data;
    })
    .catch(error => {
        console.log("error")
    });
}



export { obtenerMensajesDelCanal }