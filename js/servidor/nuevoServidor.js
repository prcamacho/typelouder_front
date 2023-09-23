import { crearFormulario } from "./crearServidor";
import { performFetch } from "./requestTemplate.js";

function nuevoServidor(){

    let formulario = crearFormulario(
        [
            { name: "nombre", type: "text" },
            { name: "descripcion", type: "text" },
            { name: "imagen", type: "file" },
            { name: "privado", type: "checkbox"} // Usar 'file' para campos de tipo archivo (imagen en este caso)
        ],
        "CREAR SERVIDOR",
        (form) => {
            var formData = new FormData();
            formData.append("id_categoria", 1);
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

}

export { nuevoServidor }