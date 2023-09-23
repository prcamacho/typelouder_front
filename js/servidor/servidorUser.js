import { obtenerCanales } from "./cargarCanales.js";
import { cargarBienvenida } from "./cargarBienvenida.js";

function servidoresUser(){
    fetch("http://127.0.0.1:8000/servidores/", {
        method: "GET",
        credentials: "include" // Configura para incluir automáticamente las cookies si es necesario
    })
    .then(response => response.json()) // Si esperas una respuesta JSON
    .then(data => {
        // Acceder a los datos JSON y mostrarlos en el HTML
        const resultadosDiv = document.querySelector(".server-icon");
        console.log(data)
        // Iterar sobre el arreglo de objetos
        data[0].forEach(servidor => {
            // Crear elementos HTML para mostrar la información del servidor

            const imageElement = document.createElement("img");
            imageElement.className = "server-icon";
            imageElement.src = servidor.imagen;
            const anchorElement = document.createElement("a");
            anchorElement.id=servidor.token;
            anchorElement.href = "#";

            anchorElement.addEventListener("click", function(event) {
                event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                const tituloServidor = document.querySelector(".titulo-servidor");
                tituloServidor.textContent = servidor.nombre;
                    cargarBienvenida(servidor.descripcion);
                    obtenerCanales(this.id);
                
        });
            // Agregar los elementos al elemento "resultados" en el HTML
            anchorElement.appendChild(imageElement);
            resultadosDiv.appendChild(anchorElement);
        });
    }) 

    .catch(error => {
        // Manejar el error en caso de que ocurra
        console.error("Error:", error);
    });   

}

export { servidoresUser }