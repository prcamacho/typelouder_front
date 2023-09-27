import { performFetch } from "../servidor/requestTemplate.js";
import { crearFormulario } from "../servidor/crearServidor.js";

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
    seccionMensajes.innerHTML= "";
    //seccionMensajes.style.flexDirection = "column-reverse";
    const divInputMensaje = document.createElement("div");
    divInputMensaje.className = "send-mensaje";
    const formularioMensaje = document.createElement("form");
    formularioMensaje.className = "formulario-mensaje";
    const inputMensaje = document.createElement("input");
    inputMensaje.className = "input-mensaje";
    inputMensaje.placeholder = "Ingrese mensaje...";
    inputMensaje.name = "mensaje";
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
            seccionMensajes.innerHTML= "";
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

            //ELIMANR EDITAR SECCION

            const botonEditarMensaje = document.createElement("button");
            botonEditarMensaje.textContent = "Editar Mensaje";
            botonEditarMensaje.style.backgroundColor = "#8d99ae"; // Fondo verde celoso
            botonEditarMensaje.style.color = "white"; // Texto blanco
            botonEditarMensaje.style.border = "none"; // Sin borde
            botonEditarMensaje.style.cursor = "pointer"; // Cambiar el cursor a una mano
            botonEditarMensaje.style.borderRadius = "3px"
            
            const botonBorrarMensaje = document.createElement("button");
            botonBorrarMensaje.textContent = "Borrar Mensaje";
            botonBorrarMensaje.style.backgroundColor = "#6a040f"; // Fondo rojo
            botonBorrarMensaje.style.color = "white"; // Texto blanco
            botonBorrarMensaje.style.border = "none"; // Sin borde
            botonBorrarMensaje.style.cursor = "pointer"; // Cambiar el cursor a una mano
            botonBorrarMensaje.style.borderRadius = "3px"
            
            
            botonEditarMensaje.textContent="E"
            botonBorrarMensaje.textContent="D"
            divImagenMensaje.appendChild(botonEditarMensaje);
            divImagenMensaje.appendChild(botonBorrarMensaje);

            botonBorrarMensaje.addEventListener("click", ()=>{
                const fetchData = {
                    url: `http://127.0.0.1:8000/mensajes/eliminar/${mensaje.id}`, // URL of the API where you want to send the form
                    method: 'DELETE', //PUT
                    headers: {
                         // Acepta respuestas en formato JSON (puedes ajustar esto según tu necesidad)
                        
                    },
                    body: {} // Use the FormData object as the request body
                };

                performFetch(fetchData)
                .then(responseData => {
                    ventanaEmergente.style.display = 'none';
                    console.log(responseData); // Handle the response data here
                    obtenerMensajesDelCanal(id_canal, nombre_canal);
                })
                .catch(error => {
                    console.error('Error:', error); // Handle errors here
                });
            })

            const ventanaEmergente = document.querySelector('#ventanaEmergente');

            // Agregar el botón de cierre "X" en la esquina superior derecha
            const cerrarBtn = document.createElement('span');
            cerrarBtn.id = 'cerrarBtn';
            cerrarBtn.textContent = '×';
            
            // Aplicar estilo CSS al elemento span
            cerrarBtn.style.color = 'white';
            
            // También puedes aplicar otros estilos según sea necesario
            cerrarBtn.style.fontSize = '24px'; // Tamaño de fuente
            cerrarBtn.style.fontWeight = 'bold'; // Peso de fuente

            cerrarBtn.addEventListener('click', () => {
                // Ocultar la ventana emergente cuando se hace clic en el botón de cierre
                ventanaEmergente.style.display = 'none';
            });


            botonEditarMensaje.addEventListener("click", ()=>{
                let formulario = crearFormulario(
                    [
                        { name: "mensaje", type: "text", value: mensaje.mensaje },
                    ],
                    "EDITAR MENSAJE",
                    (form)=> {
                        var formData = new FormData();
                        formData.append("mensaje", form.mensaje);
                        const fetchData = {
                            url: `http://127.0.0.1:8000/mensajes/editar/${mensaje.id}`, // URL of the API where you want to send the form
                            method: 'PUT', //PUT
                            headers: {
                                 // Acepta respuestas en formato JSON (puedes ajustar esto según tu necesidad)
                                
                            },
                            body: formData // Use the FormData object as the request body
                        };

                    performFetch(fetchData)
                        .then(responseData => {
                            ventanaEmergente.style.display = 'none';
                            console.log(responseData); // Handle the response data here
                            obtenerMensajesDelCanal(id_canal, nombre_canal);
                        })
                        .catch(error => {
                            console.error('Error:', error); // Handle errors here
                        });
                    }
                    
                )
        // Agregar el formulario al contenedor de la ventana emergente
        ventanaEmergente.innerHTML = '';
        
        // Agregar el botón de cierre en la esquina superior derecha
        ventanaEmergente.appendChild(cerrarBtn);
        
        ventanaEmergente.appendChild(formulario);
        
        // Mostrar la ventana emergente
        ventanaEmergente.style.display = 'block';
                
            })


            
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
        console.log(error.message)
    });
    

    formularioMensaje.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("mensaje",event.target.mensaje.value);
        fetch("http://127.0.0.1:8000/mensajes/crear/"+id_canal, {
            method: "POST",
            body: formData,
            credentials: "include" // Configurar para incluir automáticamente las cookies
        })
        .then(response => {
                inputMensaje.value="";
                obtenerMensajesDelCanal(id_canal, nombre_canal);
        })
        .catch(error => {
            // Manejar el error en caso de que ocurra
            console.error("Error:", error);
        });
    });


}



export { obtenerMensajesDelCanal }