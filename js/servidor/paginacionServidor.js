//import { estiloServidores } from "./estilosServidores";

function paginacionServidores(pagina){
    fetch("http://127.0.0.1:8000/servidores/all?pagina="+pagina)
        .then(response => response.json())
        .then(data => {

            //estiloServidores(data);
        })
       
}

export {paginacionServidores}