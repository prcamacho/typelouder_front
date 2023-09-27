import { crearFormulario } from "../servidor/crearServidor.js";
import { performFetch } from "../servidor/requestTemplate.js";
async function cargarUsuario() {
    try {
        const response = await fetch("http://127.0.0.1:8000/users/", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const botonEditar = document.querySelector(".boton-editar")

        const username = document.querySelector('.username-card');
        const nombre = document.querySelector('.nombre-apellido-card');
        const email = document.querySelector('.email-card');
        const imagen = document.querySelector('.img-popup-usuario')

        const useruser = document.querySelector('.username-usuario');
        useruser.id = data.id;
        const nombre_apellido = document.querySelector('.nombre-usuario');
        const imagen_usuario = document.querySelector('.imagen-usuario');

        username.textContent = data.username;
        nombre.textContent = `${data.nombre} ${data.apellido}`;
        email.textContent = data.email;
        imagen.src = data.imagen


        imagen_usuario.src = data.imagen;
        useruser.textContent = data.username;
        nombre_apellido.textContent = `${data.nombre} ${data.apellido}`;

        const ventanaEmergente = document.querySelector('#ventanaEmergente');

        // Agregar el botón de cierre "X" en la esquina superior derecha
        const cerrarBtn = document.createElement('span');
        cerrarBtn.id = 'cerrarBtn';
        cerrarBtn.textContent = '×';
        cerrarBtn.addEventListener('click', () => {
            // Ocultar la ventana emergente cuando se hace clic en el botón de cierre
            ventanaEmergente.style.display = 'none';
        });


        botonEditar.addEventListener("click", ()=>{
            let esconderPopupUser = document.querySelector(".popup-usuario");
            esconderPopupUser.style.display = "none";


            let formulario = crearFormulario(
                [
                    { name: "username", type: "text", value: data.username },
                    { name: "nombre", type: "text", value:data.nombre  },
                    { name: "apellido", type: "text", value:data.apellido},
                    { name: "fotodeperfil", type: "file"}, // Usar 'file' para campos de tipo archivo (imagen en este caso)
                ],
                "EDITAR PERFIL",
                (form) => {
                    var formData = new FormData();
                    formData.append("username", form.username);
                    formData.append("nombre", form.nombre);
                    formData.append("apellido", form.apellido);
                    formData.append("imagen", form.fotodeperfil);
                    
                    // Define the data for the Fetch request
                    const fetchData = {
                        url: 'http://127.0.0.1:8000/users/editar', // URL of the API where you want to send the form
                        method: 'PUT', //PUT
                        headers: {
                             // Acepta respuestas en formato JSON (puedes ajustar esto según tu necesidad)
                            
                        },
                        body: formData // Use the FormData object as the request body
                    };
                
                    // Call the performFetch function with the fetchData object
                    console.log();
                    performFetch(fetchData)
                        .then(responseData => {
                            ventanaEmergente.style.display = 'none';
                            console.log(responseData); // Handle the response data here
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




        

    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}

export { cargarUsuario }
