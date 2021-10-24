
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

