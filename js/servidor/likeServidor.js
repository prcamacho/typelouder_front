import { estiloServidores } from "./estilosServidores.js";

function like_servidor(nombre_servidor){
    fetch("http://127.0.0.1:8000/servidores/like?q="+nombre_servidor)
        .then(response => response.json())
        .then(data => {
            // Limpia la lista de servidores
            estiloServidores(data);
            
        })
}

export { like_servidor }