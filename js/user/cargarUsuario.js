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

    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}

export { cargarUsuario }
