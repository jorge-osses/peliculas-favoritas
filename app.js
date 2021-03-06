
//====================LOADER=================//
$( () => {
    setTimeout( () => {
        $('.loader').css({
            opacity: 0,
            visibility: 'hidden'
        })
    }, 1000)
})

//==========================================//

$('#ver-peliculas').click(() => {
    ui.imprimirPeliculas(administrarPeliculas)
    $('#films').delay(200)
               .slideDown(800)
               .slideUp(250)
               .slideDown(800)
    $('.titulo-vistas').css("color", "black")
           .show()
           .delay(5000)
           .slideUp(200)
           .delay(1000)
           .slideDown(200);
    
               
})

$('.modal').on('scroll', () => {
    if ($('#modal-ghibli').scrollTop()) {
        $('#botonCerrar').addClass('fondoWhite');
    } else {
        $('#botonCerrar').removeClass('fondoWhite');
    }
})


$("#vistos").append(`
    <div class="titulo-vistas" style="display:none;">
    <h2 class="letter-black">Películas ya vistas</h2>
    <button id="aparecer">mostrar</button></div>
    `);

//--- mostrar peliculas vistas----
$("#aparecer").click(() => {
    $('.vistos-div').remove();
    verVistas(peliculasVistas);
})

function verVistas(peli){
    peli.forEach(peli => {        
        $('#vistos').append(`
            <div class="vistos-div text-center" id="visto-${peli.id}">
                <h2>${peli.title}</h2>
                <hr>
            </div>`
        );
    })
}

/////// Ghibli access ////////

const ghibli = document.querySelector('#btn-ghibli')

const url = "https://ghibliapi.herokuapp.com/films"
let data = []

$(ghibli).click(() =>{
    $('.body-card').toggleClass('modal-active');
    
    $.get(url, (response, state) => {
        data = response;

        data.forEach( (film) => {
            let div = document.createElement('div');
            $(div).addClass('card');
            document.getElementById('tarjetas').appendChild(div);
            div.innerHTML =`
            <i id='${film.id}' class="fas fa-star favourite">Favorita</i>
                <h3 class="titulo-original">${film.original_title}</h3>
                <h4 class="titulo-english">${film.title} - ${film.release_date}</h4>
                <small>${film.director}</small>
                <p>${film.description}</p>
                <img class="img-movie" src="${film.movie_banner}">
            `

            $(`#${film.id}`).click(() => {
                peliculaBusqueda.title = film.title;
                peliculaBusqueda.year = film.release_date;
                peliculaBusqueda.director = film.director;
                peliculaBusqueda.genero = 'Animé/fantasia/infantil';
                peliculaBusqueda.id = film.id;
                administrarPeliculas.agregarPelicula({...peliculaBusqueda});
                ui.imprimirAlerta('Se agregó correctamente');
                ui.imprimirPeliculas(administrarPeliculas);
                reiniciarPeliBusqueda()
            
            })
            
        })
    })
})
$('#cerrarModal').click(() => {
    $('.body-card').toggleClass('modal-active');
    while (document.getElementById('tarjetas').firstChild) {
        document.getElementById('tarjetas').removeChild(document.getElementById('tarjetas').firstChild)
    }
});
$('.body-card').click(() => {
    $('.body-card').toggleClass('modal-active');
    while (document.getElementById('tarjetas').firstChild) {
        document.getElementById('tarjetas').removeChild(document.getElementById('tarjetas').firstChild)
    }
});
$('#modal-ghibli').click((event) => {
    event.stopPropagation();
});


////////////// SEARCHING ////////

const KEY_API = "8f18d607"
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const buscarApi = (search) => {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${KEY_API}&s=${search}`)
    .then((response) => response.json() )
    .then((data) => {
        let arreglo = data.Search;
        if (arreglo != null){
            for (let i=0;i<arreglo.length; i++){
                if (arreglo[i].Poster !== "N/A" && arreglo[i].Type === 'movie') {
                    let div = document.createElement('div');
                    $(div).addClass('card');
                    document.getElementById('tarjetas').appendChild(div);
                    div.innerHTML =`
                        <i id='${arreglo[i].imdbID}'class="fas fa-star favourite">Favorita</i>
                        <h2>${arreglo[i].Title} - <small>${arreglo[i].Year}</small></h2>
                        <img class="img-movie" width="100px" src="${arreglo[i].Poster}">
                    `
                }
                $(`#${arreglo[i].imdbID}`).click(() => {
                    peliculaBusqueda.title = arreglo[i].Title;
                    peliculaBusqueda.year = arreglo[i].Year;
                    peliculaBusqueda.director = 'N/A';
                    peliculaBusqueda.genero = arreglo[i].Type;
                    peliculaBusqueda.id = arreglo[i].imdbID;
                    administrarPeliculas.agregarPelicula({...peliculaBusqueda});
                    ui.imprimirAlerta('Se agregó correctamente');
                    ui.imprimirPeliculas(administrarPeliculas);
                    reiniciarPeliBusqueda()
                
                })
            }
        } else {
            $('.body-card').toggleClass('modal-active');
            ui.imprimirAlerta('No existe en la búsqueda, prueba con el nombre en inglés', 'error');
        }
    })
    .catch((error) => {
        console.log(error);
    })
    
    }
    
    
    $('.body-card').toggleClass('modal-active');
    const busqueda = document.querySelector('#search').value.trim();
    buscarApi(busqueda);

    form.reset();
})

const peliculaBusqueda = {
    title: '',
    year: '',
    director: '',
    genero: '',
    id: '',
}
const reiniciarPeliBusqueda = () => {
    peliculaBusqueda.title= '';
    peliculaBusqueda.year= '';
    peliculaBusqueda.director= '';
    peliculaBusqueda.genero= '';
    peliculaBusqueda.id= '';
}
