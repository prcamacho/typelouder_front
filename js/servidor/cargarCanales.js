import { obtenerMensajesDelCanal } from "./cargarMensajes.js";
// GUSTAVO
import { crearFormulario } from "./crearServidor.js";
import { performFetch } from "./requestTemplate.js";
//

function obtenerCanales(servidor_token) {
    // Realizar una solicitud GET a la URL deseada
    fetch("http://127.0.0.1:8000/canales/" + servidor_token, {
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
        const miDiv = document.querySelector(".canales");
        miDiv.innerHTML = "";
        miDiv.classList.add("contenedor-canales"); 
        data[0].forEach(function(canal) {
            const h4Element = document.createElement("h4");
            h4Element.textContent = "# "+canal.nombre;
            h4Element.className = "canales-clickleables";
            h4Element.id = 'canal'+canal.id;
            miDiv.appendChild(h4Element);
        });

        //BOTON ADD CANAL
        const ventanaEmergente = document.querySelector('#ventanaEmergente');

        // Agregar el botón de cierre "X" en la esquina superior derecha
        const cerrarBtn = document.createElement('span');
        cerrarBtn.id = 'cerrarBtn';
        cerrarBtn.textContent = '×';
        cerrarBtn.addEventListener('click', () => {
            // Ocultar la ventana emergente cuando se hace clic en el botón de cierre
            ventanaEmergente.style.display = 'none';
        });
        
        const divAddCanal = document.createElement("div");
        divAddCanal.textContent = "CREAR CANAL"

        divAddCanal.addEventListener("click", () => {
            
            let campos = [{name:"nombre", type: "text"}]
            let formulario_canal = crearFormulario(campos, "CREAR CANAL",(form)=>{
                var formData = new FormData();
                formData.append("nombre", form.nombre);
                const fetchData = {
                    url: `http://127.0.0.1:8000/canales/crear/${servidor_token}`, // URL of the API where you want to send the form
                    method: 'POST', // POST method to send data
                    headers: {
                        // Configure Content-Type header for form data with a file
                    },
                    body: formData // Use the FormData object as the request body
                
                };
                performFetch(fetchData)
                .then(responseData => {
                    ventanaEmergente.style.display = 'none';
                    console.log(responseData); // Handle the response data here
                })
                .catch(error => {
                    console.error('Error:', error); // Handle errors here
                });
            }); //
                            // Agregar el formulario al contenedor de la ventana emergente
            ventanaEmergente.innerHTML = '';
        
                            // Agregar el botón de cierre en la esquina superior derecha
            ventanaEmergente.appendChild(cerrarBtn);
                            
            ventanaEmergente.appendChild(formulario_canal);
                            
                            // Mostrar la ventana emergente
            ventanaEmergente.style.display = 'block';
                    
        })

        miDiv.appendChild(divAddCanal);


        //
        miDiv.addEventListener("click", function(event) {
            if (event.target.classList.contains("canales-clickleables")) {
                // Se hizo clic en un elemento h4 con la clase "canales-clickleables"
                const clickedH4 = event.target;
                const id = clickedH4.id;
                const parteNumerica = id.match(/\d+/);
                const id_canal = parseInt(parteNumerica[0], 10);
                const nombre_canal = clickedH4.textContent;
                obtenerMensajesDelCanal(id_canal,nombre_canal);

                // Cargar canal al Path
                const tokenUrl = window.location.hash.substring(1).split('#')[0];
                window.history.replaceState({}, '', 'http://127.0.0.1:5500/page/');
                const nuevaURL = "/page/#"+tokenUrl+"#"+id_canal;
                window.history.pushState({}, '', nuevaURL);
                // Realiza la acción deseada con el ID del canal
        
                // Elimina la clase "clicked" de todos los elementos h4 y agrega la clase "clicked" al clicado
                const h4Elements = miDiv.querySelectorAll(".canales-clickleables");
                h4Elements.forEach(function(el) {
                    el.classList.remove("clicked");
                });
                clickedH4.classList.add("clicked");
            }
        });
    })
    .catch(error => {
        // Manejar el error en caso de que ocurra
        console.error("Error:", error);
    });
}

export{ obtenerCanales }