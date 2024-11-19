document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de partículas (estrellas)
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "polygon",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 6
                    }
                },
                "opacity": {
                    "value": 0.7,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.5,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Funcionalidad para evitar sugerir libros repetidos en los últimos 10 clics
    const sugerirBtn = document.getElementById('sugerir-btn');
    if (sugerirBtn) {
        sugerirBtn.addEventListener('click', () => {
            // Obtener la lista de libros recientemente sugeridos y los libros leídos
            let recientes = JSON.parse(localStorage.getItem('librosRecientes')) || [];
            let leidos = JSON.parse(localStorage.getItem('librosLeidos')) || [];
            fetch('libros.json')
                .then(response => response.json())
                .then(libros => {
                    // Filtrar libros que no estén en la lista de recientes ni en la lista de libros leídos
                    const librosDisponibles = libros.filter(libro => !recientes.includes(libro.titulo) && !leidos.includes(libro.titulo));

                    // Si no hay libros disponibles, reiniciar la lista de recientes y leídos
                    if (librosDisponibles.length === 0) {
                        recientes = [];
                        leidos = [];
                        localStorage.setItem('librosRecientes', JSON.stringify(recientes));
                        localStorage.setItem('librosLeidos', JSON.stringify(leidos));
                    }

                    // Elegir un libro aleatorio de los disponibles
                    const libroAleatorio = librosDisponibles[Math.floor(Math.random() * librosDisponibles.length)];

                    // Actualizar la lista de recientes
                    recientes.push(libroAleatorio.titulo);
                    if (recientes.length > 10) {
                        recientes.shift(); // Mantener solo los últimos 10 libros
                    }
                    localStorage.setItem('librosRecientes', JSON.stringify(recientes));

                    // Guardar el libro seleccionado y redirigir a la página de detalles
                    localStorage.setItem('libroSeleccionado', JSON.stringify(libroAleatorio));
                    window.location.href = 'detalle.html';
                });
        });
    }

    // Mostrar detalles del libro seleccionado en detalle.html
    const titulo = document.getElementById('titulo');
    const portada = document.getElementById('portada');
    const autor = document.getElementById('autor');
    const genero = document.getElementById('genero');
    const goodreadsLink = document.getElementById('goodreads-link');
    const marcarLeidoBtn = document.getElementById('marcar-leido-btn'); // Botón para marcar como leído

    if (titulo && portada && autor && genero && goodreadsLink) {
        const libroSeleccionado = JSON.parse(localStorage.getItem('libroSeleccionado'));
        if (libroSeleccionado) {
            titulo.textContent = libroSeleccionado.titulo;
            portada.src = libroSeleccionado.portada;
            autor.textContent = libroSeleccionado.autor;
            genero.textContent = libroSeleccionado.genero;
            goodreadsLink.href = libroSeleccionado.goodreads;

            // Marcar el libro como leído
            if (marcarLeidoBtn) {
                marcarLeidoBtn.addEventListener('click', () => {
                    let leidos = JSON.parse(localStorage.getItem('librosLeidos')) || [];
                    if (!leidos.includes(libroSeleccionado.titulo)) {
                        leidos.push(libroSeleccionado.titulo);
                        localStorage.setItem('librosLeidos', JSON.stringify(leidos));
                    }
                    alert('¡Libro marcado como leído!');
                });
            }
        }
    }

    // Botón para volver a la página principal
    const volverBtn = document.getElementById('volver-btn');
    if (volverBtn) {
        volverBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Botón para sugerir otro libro en detalle.html
    const sugerirOtroBtn = document.getElementById('sugerir-otro-btn');
    if (sugerirOtroBtn) {
        sugerirOtroBtn.addEventListener('click', () => {
            // Obtener la lista de libros recientemente sugeridos y los libros leídos
            let recientes = JSON.parse(localStorage.getItem('librosRecientes')) || [];
            let leidos = JSON.parse(localStorage.getItem('librosLeidos')) || [];
            fetch('libros.json')
                .then(response => response.json())
                .then(libros => {
                    // Filtrar libros que no estén en la lista de recientes ni en la lista de libros leídos
                    const librosDisponibles = libros.filter(libro => !recientes.includes(libro.titulo) && !leidos.includes(libro.titulo));

                    // Si no hay libros disponibles, reiniciar la lista de recientes y leídos
                    if (librosDisponibles.length === 0) {
                        recientes = [];
                        leidos = [];
                        localStorage.setItem('librosRecientes', JSON.stringify(recientes));
                        localStorage.setItem('librosLeidos', JSON.stringify(leidos));
                    }

                    // Elegir un libro aleatorio de los disponibles
                    const libroAleatorio = librosDisponibles[Math.floor(Math.random() * librosDisponibles.length)];

                    // Actualizar la lista de recientes
                    recientes.push(libroAleatorio.titulo);
                    if (recientes.length > 10) {
                        recientes.shift(); // Mantener solo los últimos 10 libros
                    }
                    localStorage.setItem('librosRecientes', JSON.stringify(recientes));

                    // Guardar el libro seleccionado y recargar la página
                    localStorage.setItem('libroSeleccionado', JSON.stringify(libroAleatorio));
                    window.location.reload();
                });
        });
    }

        // Función para cargar los libros desde un archivo JSON
fetch('libros.json')
.then(response => response.json())
.then(libros => {
  // Filtrar los libros no leídos
  let librosNoLeidos = libros.filter(libro => !verificarLibroLeido(libro.id));

  // Función para mezclar el array de libros aleatoriamente
  function mezclarArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Selección aleatoria de un índice
          [array[i], array[j]] = [array[j], array[i]]; // Intercambiar los elementos
      }
  }

  // Mezclar los libros no leídos aleatoriamente
  mezclarArray(librosNoLeidos);

  // Ahora puedes usar librosNoLeidos para mostrar solo los libros no leídos
  mostrarLibros(librosNoLeidos);  // Función que debes implementar para mostrar los libros en pantalla
})
.catch(error => {
  console.error('Error al cargar los libros:', error);
});

// Función para verificar si un libro está marcado como leído
function verificarLibroLeido(idLibro) {
  // Aquí debes agregar tu lógica para verificar si un libro está marcado como leído
  // Puede ser mediante almacenamiento local o alguna base de datos.
  return localStorage.getItem(`leido-${idLibro}`) === 'true'; // Ejemplo con localStorage
}

// Función para mostrar los libros en pantalla
function mostrarLibros(libros) {
  // Aquí deberías implementar el código para mostrar los libros en la interfaz de usuario
  // Esto dependerá de cómo deseas presentar las sugerencias.
  console.log(libros);  // Ejemplo: muestra los libros en la consola
}


});
