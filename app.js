
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
// const url = "http://www.omdbapi.com/?i=tt3896198&apikey=8f18d607"
let data = []

$(ghibli).click(() =>{
    $('.body-card').toggleClass('modal-active');
    
    $.get(url, (response, state) => {
        data = response
        console.log(data)
        
        data.forEach( (film) => {
            let div = document.createElement('div');
            $(div).addClass('card');
            document.getElementById('modal-ghibli').appendChild(div);
            div.innerHTML =`
                <h3 class="titulo-original">${film.original_title}</h3>
                <h4 class="titulo-english">${film.title} - ${film.release_date}</h4>
                <p>${film.description}</p>
                <img class="img-movie" src="${film.movie_banner}">
            `
            
        })
    })
})
$('#cerrarModal').click(() => {
    $('.body-card').toggleClass('modal-active');
});
$('.body-card').click(() => {
    $('.body-card').toggleClass('modal-active');
});
$('#modal-ghibli').click((event) => {
    event.stopPropagation();
});
