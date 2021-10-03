let peliculas = JSON.parse(localStorage.getItem('peliculas'));


class Pelicula {
    constructor(title, year, director, genero) {
        this.title = title;
        this.year = year;
        this.director = director;
        this.genero = genero;
    }
    addPelicula(){
        peliculas.push({'title': this.title, 'year': this.year, 'director': this.director, 'genero': this.genero});
        alert(`se agrega la Película ${this.title} al array`);
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        peliculas = JSON.parse(localStorage.getItem('peliculas'));
    }
    removePelicula(){
        peliculas[this].remove();
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        peliculas = JSON.parse(localStorage.getItem('peliculas'));
    }
}





const abrirModal = document.getElementById('agregar');
const cerrarModal = document.getElementById('cerrar-modal');
const modalContainer = document.getElementsByClassName('modal-body')[0];
const modal = document.getElementsByClassName('modal')[0];

abrirModal.addEventListener('click', () => {
    modalContainer.classList.toggle('modal-active')
})

cerrarModal.addEventListener('click', () => {
    modalContainer.classList.toggle('modal-active')
})

modalContainer.addEventListener('click', () => {
    modalContainer.classList.toggle('modal-active')
})

modal.addEventListener('click', (event) => {
    event.stopPropagation()
})




const form = document.getElementById('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event)

    const titulo = title.value;
    const anio = year.value;
    const direccion = director.value;
    const tipo = genero.value;

    if (titulo.length > 3 && anio <= 2021 && anio >= 1901 && direccion.length > 3) {
        let newPelicula = new Pelicula(titulo, anio, direccion, tipo);
        newPelicula.addPelicula();
        console.log(peliculas)

        form.reset()
        form.submit()
    }
})

if (peliculas.length != 0){
    for (const pelicula of peliculas) {
    let div = document.createElement("div");
    let trashIcon = document.createElement("i");
    div.innerHTML = `<h3>${pelicula.title}</h3>
                            <p>Año: ${pelicula.year}</p>
                            <p>Director: ${pelicula.director}</p>
                            <p>Genero: ${pelicula.genero}</p>`;
    document.getElementById('films').appendChild(div);
    div.classList.add('peliculas-items');
    trashIcon.className = "fas fa-trash";
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener('mouseover', () => {
        trashIcon.style.color = "lightcoral";
    })
    trashIcon.addEventListener('mouseout', () => {
        trashIcon.style.color = "darkgray"
    })
    trashIcon.addEventListener("click", () => {
        div.remove();
        pelicula.removePelicula();
    });
    div.appendChild(trashIcon);
    }
}