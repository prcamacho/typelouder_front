function estiloServidores(data){
            // Procesa los datos y muestra los servidores
    const listaServidores = document.querySelector('.container-lista-servidor');
    listaServidores.innerHTML="";
      
    data[0].forEach(servidor => {
        const divCardServidores = document.createElement("div");
        divCardServidores.className = "card-servidor";
        const divContenedorImagenCard = document.createElement("div");
        divContenedorImagenCard.className = "contenedor-imagen-card";
        const imgCardServidor = document.createElement("img");
        imgCardServidor.className = "img-card-servidor";
        imgCardServidor.src = servidor.imagen;
        const divContenidoCard = document.createElement("div");
        divContenidoCard.className = "div-contenido-card";
        const h3TituloCard = document.createElement("h3");
        h3TituloCard.className = "h3-titulo-card";
        h3TituloCard.textContent = servidor.nombre;
        const divDescripcionCard = document.createElement("div");
        divDescripcionCard.className = "div-descripcion-card";
        divDescripcionCard.textContent = servidor.descripcion;
        const botonUnirseCanal = document.createElement("button");
        botonUnirseCanal.className = "boton-unirse-canal";
        botonUnirseCanal.textContent = "Unirse"

        divContenedorImagenCard.appendChild(imgCardServidor);
        divContenidoCard.appendChild(h3TituloCard);
        divContenidoCard.appendChild(divDescripcionCard);
        divCardServidores.appendChild(divContenedorImagenCard);
        divCardServidores.appendChild(divContenidoCard);
        divCardServidores.appendChild(botonUnirseCanal);
        listaServidores.appendChild(divCardServidores);
    });
}

export { estiloServidores }