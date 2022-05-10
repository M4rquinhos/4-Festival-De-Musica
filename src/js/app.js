document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelectorAll('body');

    window.addEventListener('scroll', function() {
        // console.log(sobreFestival.getBoundingClientRect());

        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}


function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( (enlace) => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    // Recorre el array.length de imágenes y crea una imagen por cada una
    for (let i = 1; i <= 12; i++) {
        const img = document.createElement('picture')
        img.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        // Obtiene el id de cada imagen y lo envia a la función mostrarImagen
        img.onclick = function() {
            mostrarImagen(i);
        }

        // Añade la imagen a la galería
        galeria.appendChild(img);
    }
}


function mostrarImagen(id) {
    // Crea el picture-element
    const img = document.createElement('picture')
    img.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(img);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        // const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }


    // Crea el boton de cerrar
    const cerrar = document.createElement('P');
    cerrar.textContent = 'X';
    cerrar.classList.add('btn-cerrar');
    cerrar.onclick = function() {
        // const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrar);

    // Lo añade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}