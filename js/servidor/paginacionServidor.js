function paginacionServidores(pagina){
    fetch("http://127.0.0.1:8000/servidores/all?pagina="+pagina)
        .then(response => response.json())
        .then(data => {
            // Limpia la lista de servidores
            const listaServidores = document.querySelector('.container-lista-servidor');
            listaServidores.innerHTML = '';
            // Procesa los datos y muestra los servidores
            data[0].forEach(servidor => {
                const li = document.createElement('li');
                li.textContent = `${servidor.nombre} - ${servidor.descripcion}`;
                listaServidores.appendChild(li);
            });
        })
       
}

export {paginacionServidores}