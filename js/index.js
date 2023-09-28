import { crearFormulario } from "./servidor/crearServidor.js";
import { performFetch } from "./servidor/requestTemplate.js";
import { cargarUsuario } from "./user/cargarUsuario.js";
import { paginacionServidores } from "./servidor/paginacionServidor.js";
import { servidoresUser } from "./user/servidorUser.js";
import { like_servidor } from "./servidor/likeServidor.js";
import { categoria_servidor } from "./servidor/categoriaServidores.js";
// import { obtenerCanales } from "./servidor/cargarCanales.js";

document.addEventListener("DOMContentLoaded", function () {
    
    

    if (window.location.hash.substring(1).split('#')[0] !== ['']){
        console.log("hola");    
    }
    if (!document.cookie.includes('authenticated=true')) {
        window.location.href = "../page/login.html";
        // Realiza las acciones apropiadas para un usuario autenticado
    }

    setTimeout(function() {
        setTimeout(function() {
          paginacionServidores(1);  
        }, 500);
        cargarUsuario();
      }, 500);
    
    


    var tituloServidor = document.querySelector(".contenedor-titulo");
    var popupServidor = document.querySelector(".popup-servidor");
    var imagenFlecha = document.querySelector(".flecha");
    var popupVisible = false;

    //SECCION DEL BOTON AGREGAR SERVIDOR
    const addservidor = document.querySelector(".add-icon");
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

    //SECCION DEL BOTON AGREGAR SERVIDOR
    addservidor.addEventListener("click", () => {
       
        console.log("Add servidor");
        let formulario = crearFormulario(
            [
                { name: "nombre", type: "text" },
                { name: "descripcion", type: "text" },
                { name: "imagen", type: "file" },
                { name: "categoria", type: "select", values: ["Videojuegos", "Peliculas", "Historia"] },
                { name: "privado", type: "checkbox" }
            ],
            "CREAR SERVIDOR",
            (form) => {
                var idCategoria;
                switch (form.categoria) {
                    case "Videojuegos":
                        idCategoria = 1;
                        break;
                    case "Peliculas":
                        idCategoria = 2;
                        break;
                    case "Historia":
                        idCategoria = 3;
                        break;
                    default:
                        idCategoria = 1; // Valor predeterminado si no coincide ninguna opción
                        break;
                }
            
                // Crear un nuevo objeto formData y establecer "id_categoria"
                var formData = new FormData();
                formData.append("id_categoria", idCategoria);
                formData.append("nombre", form.nombre);
                formData.append("descripcion", form.descripcion);
                formData.append("privado", form.privado === "off" ? "true" : "false");
                formData.append("imagen", form.imagen);
            
                // Define the data for the Fetch request
                const fetchData = {
                    url: 'http://127.0.0.1:8000/servidores/crear', // URL of the API where you want to send the form
                    method: 'POST', // POST method to send data
                    headers: {
                        // Configure Content-Type header for form data with a file
                    },
                    body: formData // Use the FormData object as the request body
                };
            
                // Call the performFetch function with the fetchData object
                performFetch(fetchData)
                    .then(responseData => {
                        ventanaEmergente.style.display = 'none';
                        console.log(responseData); // Handle the response data here
                    })
                    .catch(error => {
                        console.error('Error:', error); // Handle errors here
                    });
            }
         
            
        );
        
        
        // Agregar el formulario al contenedor de la ventana emergente
        ventanaEmergente.innerHTML = '';
        
        // Agregar el botón de cierre en la esquina superior derecha
        ventanaEmergente.appendChild(cerrarBtn);
        
        ventanaEmergente.appendChild(formulario);
        
        // Mostrar la ventana emergente
        ventanaEmergente.style.display = 'block';
    });

    // Para ocultar la ventana emergente en otro evento (por ejemplo, al hacer clic en el botón de cierre principal)
    function ocultarVentanaEmergente() {
        ventanaEmergente.style.display = 'none';
    }
    //FIN

    
    
    

    tituloServidor.addEventListener('click', function() {
    popupVisible = !popupVisible;
    popupServidor.style.display = popupVisible ? 'block' : 'none';
    imagenFlecha.style.transition = 'transform 0.3s ease-in-out';
    popupServidor.style.transform = popupVisible ? 'translateY(0%)' : 'translateY(100%)';
    imagenFlecha.style.transform = popupVisible ? 'rotateZ(180deg)' : 'rotateZ(0deg)';
    setTimeout(function() {
        imagenFlecha.style.transition = '';
    }, 300);
    });


    
    var contenedorUsuario = document.querySelector(".contenedor-usuario");
    var popupUsuario = document.querySelector(".popup-usuario");
    var imagenFlechaUsuario = document.querySelector(".flecha-usuario");
    var popupVisibleUsuario = false;

    contenedorUsuario.addEventListener('click', function() {
    popupVisibleUsuario = !popupVisibleUsuario;
    popupUsuario.style.display = popupVisibleUsuario ? 'block' : 'none';
    imagenFlechaUsuario.style.transition = 'transform 0.3s ease-in-out';
    // popupServidor.style.transform = popupVisible ? 'translateY(0)' : 'translateY(-100%)';
    imagenFlechaUsuario.style.transform = popupVisibleUsuario ? 'rotateZ(0deg)' : 'rotateZ(180deg)';
    setTimeout(function() {
        imagenFlechaUsuario.style.transition = '';
    }, 300);
    });

    servidoresUser();

    const input_servidor = document.querySelector(".container-buscador");
    input_servidor.addEventListener("input", function() {
        const nombre_servidor = input_servidor.value;
        if (nombre_servidor !== ""){
            setTimeout(function(){
            like_servidor(nombre_servidor);
            },200);
        } else {
            paginacionServidores(1);
        } // Pasa "this" como argumento para asegurarte de que se obtiene el valor correcto
    });

});

const divCategorias = document.querySelectorAll(".img-nombre-categoria");

function handleClick(event) {
    const divCategoria = event.currentTarget;
        divCategorias.forEach((div) => {
            div.classList.remove("canal-seleccionado");
        });
    divCategoria.classList.add("canal-seleccionado");
    const idCategoriaSeleccionada = divCategoria.id;
    const match = idCategoriaSeleccionada.match(/\d+/);
    if (match) {
        const idCategoriaObtenida = parseInt(match[0]);
        if (idCategoriaObtenida === 0) {
            paginacionServidores(1);
        } else {
            categoria_servidor(idCategoriaObtenida);
        }
    } else {
        console.log("El ID del elemento no contiene un número.");
    }
}
divCategorias.forEach((div) => {
    const contenidoCategoria = div.querySelector(".contenido-categoria");
    div.addEventListener("click", handleClick);
});




var enlaces = document.querySelectorAll(".boton-unirse-canal");

enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Obtén el token de la URL
        var token = window.location.hash.substring(1).split('#')[0];
        console.log(token);

        // Crea un campo de entrada de texto oculto para simular la pulsación de "Enter"
        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.style.display = "none";
        document.body.appendChild(inputElement);

        // Simula la pulsación de "Enter" en el campo de entrada
        inputElement.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                // Llama a la función obtenerCanales después de la simulación de "Enter"
                obtenerCanales(token);

                // Limpia el campo de entrada y elimina el evento
                inputElement.value = "";
                document.body.removeChild(inputElement);
            }
        });

        // Dispara un evento de pulsación de tecla en el campo de entrada
        var enterEvent = new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
        });
        inputElement.dispatchEvent(enterEvent);
    });
});

const cerrarSesion = document.querySelector(".cerrar-sesion");

cerrarSesion.addEventListener("click", function (event) {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/users/logout", {
        method: "GET",
        credentials: "include" // Configurar para incluir automáticamente las cookies
    })
    .then(response => {
            window.location.href = "../page/login.html";

    })
    .catch(error => {
        // Manejar el error en caso de que ocurra
        console.error("Error:", error);
    });
});


console.log(window.location.hash.substring(1).split('#'));

