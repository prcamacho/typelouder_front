import { estiloServidores } from "./estilosServidores.js";

function categoria_servidor(id_categoria){
    fetch("http://127.0.0.1:8000/servidores/categoria/"+id_categoria)
        .then(response => response.json())
        .then(data => {
            // Limpia la lista de servidores
            estiloServidores(data);
            
        })
}

export { categoria_servidor }