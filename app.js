
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
    $('#films').slideUp(200)
               .slideDown(800)
               .slideUp(250)
               .slideDown(800)
})


$("#vistos").prepend('<h3 style="display:none;" class="titulo-vistas letter-black">Películas ya vistas<button id="aparecer">mostrar</button></h3>');
$('h3').css("color", "black")
       .show()
       .delay(5000)
       .slideUp(200)
       .delay(1000)
       .slideDown(200);

       

//---
$("#aparecer").click(() => {
    verVistas(peliculasVistas);
})

function verVistas(peli){
    peli.forEach(peli => {
        $('#vistos').append(`
                <div class="vistos-div" id="visto-${peli.id}">
                <h2>${peli.title}</h2>
                <hr>
                </div>`
                );
            })
        }
        
        // <button id="btn-${peli.id}">quitar</button>