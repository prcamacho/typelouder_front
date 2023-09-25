function estiloServidores(servidores){
            // Procesa los datos y muestra los servidores
    const listaServidores = document.querySelector('.container-lista-servidor');
    listaServidores.innerHTML = '';
    servidores[0].forEach(servidor => {
        const divCardServidores = document.createElement("div");
        divCardServidores.className = "card-servidor";
        
    });
}

export { estiloServidores }