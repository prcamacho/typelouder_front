import { obtenerCanales } from "../canales/cargarCanales.js";
import { servidoresUser } from "../user/servidorUser.js";

function estiloServidores(data){
            // Procesa los datos y muestra los servidores
    const listaServidores = document.querySelector('.container-lista-servidor');
    listaServidores.innerHTML="";
      
    data[0].forEach(servidor => {

        const divCardServidores = document.createElement("div");
        divCardServidores.className = "card-servidor";
        const divContenedorImagenCard = document.createElement("div");
        divContenedorImagenCard.className = "contenedor-imagen-card";
        const imgCardServidor = document.createElement("img");
        imgCardServidor.className = "img-card-servidor";
        imgCardServidor.src = servidor.imagen;
        const divContenidoCard = document.createElement("div");
        divContenidoCard.className = "div-contenido-card";
        const h3TituloCard = document.createElement("h3");
        h3TituloCard.className = "h3-titulo-card";
        h3TituloCard.textContent = servidor.nombre;
        const divDescripcionCard = document.createElement("div");
        divDescripcionCard.className = "div-descripcion-card";
        divDescripcionCard.textContent = servidor.descripcion;
        const botonUnirseServidor = document.createElement("button");
        botonUnirseServidor.className = "boton-unirse-canal";
        botonUnirseServidor.textContent = "Unirse"
        botonUnirseServidor.href = "http://127.0.0.1:5500/page/#"+servidor.token;


        divContenedorImagenCard.appendChild(imgCardServidor);
        divContenidoCard.appendChild(h3TituloCard);
        divContenidoCard.appendChild(divDescripcionCard);
        divCardServidores.appendChild(divContenedorImagenCard);
        divCardServidores.appendChild(divContenidoCard);
        divCardServidores.appendChild(botonUnirseServidor);
        listaServidores.appendChild(divCardServidores);
        
        botonUnirseServidor.addEventListener("click", function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            fetch("http://127.0.0.1:8000/miembros/es_miembro/"+servidor.token, {
                    method: "GET",
                    credentials: "include" // Configura para incluir automáticamente las cookies si es necesario
                })
                .then(response => response.json()) // Si esperas una respuesta JSON
                .then(data => {
                    if (data[0] === true){
                        obtenerCanales(servidor.token);
                        window.history.replaceState({}, '', 'http://127.0.0.1:5500/page/');
                        const nuevaURL = "/page/#"+servidor.token;
                        window.history.pushState({}, '', nuevaURL);
                    } else {

                        const popupConfirmacion = document.querySelector('.popup-confirmacion');
                        popupConfirmacion.style.display = 'block';
                        const mensajeConfirmacionPopup = document.querySelector('.mensaje-confirmacion-popup');
                        mensajeConfirmacionPopup.textContent = "¿Desea Unirse a "+servidor.nombre+"?";
                        const aceptarButton = document.querySelector('.boton-aceptar');
                        const cancelarButton = document.querySelector('.boton-cancelar');

                        aceptarButton.addEventListener('click', () => {
                            popupConfirmacion.style.display = 'none';
                            setTimeout(function() {
                            fetch("http://127.0.0.1:8000/miembros/unirse/"+servidor.token, {
                            method: "POST",
                            credentials: "include" // Configura para incluir automáticamente las cookies si es necesario
                            })
                            .then(response => {
                                obtenerCanales(servidor.token);
                                window.history.replaceState({}, '', 'http://127.0.0.1:5500/page/');
                                const nuevaURL = "/page/#"+servidor.token;
                                window.history.pushState({}, '', nuevaURL);
                                    setTimeout(function() {
                                        
                                        servidoresUser();
                                    }, 500);
                                })
                                .catch(error => {
                                    // Manejar el error en caso de que ocurra
                                });
                            }, 500);
                        });
                        cancelarButton.addEventListener('click', () => {
                            popupConfirmacion.style.display = 'none';
                        });

                    }
                });
        });    
    });
}

export { estiloServidores }