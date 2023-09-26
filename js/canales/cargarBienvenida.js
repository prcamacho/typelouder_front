function cargarBienvenida(servidor){
    const seccionDerecha = document.querySelector(".servidor-search");
    seccionDerecha.innerHTML = "";
    //seccionDerecha.style.display = "block" 
    const divTituloCanal = document.createElement("div");
    divTituloCanal.className = 'titulo-canal';
    const seccionMensajes = document.createElement("div");
    seccionMensajes.className = 'seccion-mensajes';
    seccionMensajes.style.flexDirection = "column";
    
    const lottieBienvenida = document.createElement("lottie-player");
    lottieBienvenida.className = "lottie-bienvenida"
    lottieBienvenida.src = '../static/animaciones/girl_chat.json'; // Ruta al archivo JSON de la animación Lottie
    lottieBienvenida.loop = true; // ¿Debería la animación repetirse en bucle?
    lottieBienvenida.autoplay = true; // ¿Debería la animación comenzar automáticamente?
    lottieBienvenida.mode = "normal"; 
    lottieBienvenida.style.margin = "0 auto";
    
    const tituloBienvenida = document.createElement('h2');
    tituloBienvenida.className = "titulo-bienvenida";
    tituloBienvenida.textContent = "Bienvenido"
    const tituloServidorBienvenida = document.createElement('h1');
    tituloServidorBienvenida.className = "titulo-servidor-bienvenida";
    tituloServidorBienvenida.textContent = servidor.nombre;
    const mensajeBienvenida = document.createElement('p');
    mensajeBienvenida.className = "mensaje-bienvenida";
    mensajeBienvenida.textContent = servidor.descripcion;

    seccionMensajes.appendChild(lottieBienvenida);
    seccionMensajes.appendChild(tituloBienvenida);
    seccionMensajes.appendChild(tituloServidorBienvenida);
    seccionMensajes.appendChild(mensajeBienvenida);
    seccionDerecha.appendChild(divTituloCanal);
    seccionDerecha.appendChild(seccionMensajes);
}

export { cargarBienvenida }