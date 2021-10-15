// Campos del Formulario
const nameInput = document.querySelector('#title');
const yearInput = document.querySelector('#year');
const directorInput = document.querySelector('#director');
const generoInput = document.querySelector('#genero');

// UI
const formulario = document.querySelector('#form');
const contenedorFilms = document.querySelector('#films');

let editando;
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
// localStorage.setItem('peliculas', []);

class Peliculas {
  constructor(){
    this.peliculas = [];
  }

  agregarPelicula(pelicula){
    this.peliculas = [...this.peliculas, pelicula]
    guardarLocal('peliculas', JSON.stringify(this.peliculas));
    console.log(this.peliculas)
  }

  eliminarPelicula(id){
    this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== id)
    guardarLocal('peliculas', JSON.stringify(this.peliculas));
  }

  editarPelicula(peliculaActualizada){
    this.peliculas = this.peliculas.map( pelicula => pelicula.id === peliculaActualizada.id ? peliculaActualizada : pelicula );
    guardarLocal('peliculas', JSON.stringify(this.peliculas));
  }
}

class UI {
  imprimirAlerta(mensaje, tipo){
    //crear div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center');

    //Agregar class en base al tipo de error
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    //mensaje de error
    divMensaje.textContent = mensaje;
    // agregar al DOM
    document.querySelector('#modal').insertBefore(divMensaje, document.querySelector('#cerrar-modal'));
    //quitar alerta despues de 5 seg
    setTimeout(() => {
      divMensaje.remove();
    }, 5000 );
  }

  imprimirPeliculas({peliculas}){
    this.limpiarHTML();
    peliculas.forEach(pelicula => {
      const { title, year, director, genero, id } = pelicula;

      const divPelicula = document.createElement('div');
      divPelicula.dataset.id = id;
      const trashIcon = document.createElement("i");
      const editIcon = document.createElement("i");
      divPelicula.innerHTML = `<h3>${title}</h3>
                                <p>Año: <small>${year}</small></p>
                                <p>Director: ${director}</p>
                                <p>Genero: ${genero}</p>`;
      contenedorFilms.appendChild(divPelicula);
      divPelicula.classList.add("peliculas-items");
      trashIcon.className = "fas fa-trash icons";
      trashIcon.style.color = "darkgray";
      trashIcon.addEventListener("mouseover", () => {
        trashIcon.style.color = "lightcoral";
      });
      trashIcon.addEventListener("mouseout", () => {
        trashIcon.style.color = "darkgray";
      });
      trashIcon.addEventListener("click", () => {
        eliminarPelicula(id);
      });
      divPelicula.appendChild(trashIcon);
      editIcon.className = "fas fa-edit icons";
      editIcon.style.color = "darkgray";
      editIcon.addEventListener("mouseover", () => {
        editIcon.style.color = "limegreen";
      });
      editIcon.addEventListener("mouseout", () => {
        editIcon.style.color = "darkgray";
      });
      editIcon.addEventListener("click", () => {
        cargarEdicion(pelicula);
      });
      divPelicula.appendChild(editIcon);
    })
  }
  limpiarHTML() {
    while (contenedorFilms.firstChild) {
      contenedorFilms.removeChild( contenedorFilms.firstChild )
    }
  }
}

const ui = new UI();
const administrarPeliculas = new Peliculas();

// Registrar eventos


function eventListeners() {
  nameInput.addEventListener('input', datosFilm);
  yearInput.addEventListener('input', datosFilm);
  directorInput.addEventListener('input', datosFilm);
  generoInput.addEventListener('input', datosFilm);
  
  formulario.addEventListener('submit', nuevaPelicula);
}
// Objeto con informacion de la pelicula
const peliculaObj = {
  title: '',
  year: '',
  director: '',
  genero: '',
}
// Agregar datos al objeto de peliculas
function datosFilm(e) {
  peliculaObj[e.target.name] = e.target.value;
  
}

// Validar y agregar una nueva pelicula
function nuevaPelicula(e){
  e.preventDefault();

  //extraer la informacion del obj
  const { title, year, director, genero } = peliculaObj;
  
  //validacion
  if (title === '' || year === '' || director === ''){
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
    return;
  }
  if (editando) {
    ui.imprimirAlerta('Editado correctamente');
    //pasar el obj a edicion
    administrarPeliculas.editarPelicula({...peliculaObj});
    
    formulario.querySelector('button[type="submit"]').textContent = "Agregar"
    editando = false;
    
  } else {
    // generar ID del obj
    peliculaObj.id = Date.now();
    // Creando una nueva Pelicula
    administrarPeliculas.agregarPelicula({...peliculaObj});
    ui.imprimirAlerta('Se agregó correctamente');
  }
  
  reiniciarObjeto();
  
  formulario.reset();
  
  ui.imprimirPeliculas(administrarPeliculas);
}

function reiniciarObjeto() {
  peliculaObj.title = '';
  peliculaObj.year = '';
  peliculaObj.director = '';
  peliculaObj.genero = '';
}

function eliminarPelicula(id) {
  //Eliminar la pelicula
  administrarPeliculas.eliminarPelicula(id);
  //Mostrar mensaje
  ui.imprimirAlerta('Se Eliminó Correctamente');
  //Actualizar peliculas
  ui.imprimirPeliculas(administrarPeliculas);
}

// cargar modo edicion
function cargarEdicion(pelicula) {
  modalContainer.classList.toggle("modal-active");
  const { title, year, director, genero, id } = pelicula;
  // rellenar formulario
  nameInput.value = title;
  yearInput.value = year;
  directorInput.value = director;
  generoInput.value = genero;
  
  //rellenar el objeto
  peliculaObj.title = title;
  peliculaObj.year = year;
  peliculaObj.director = director;
  peliculaObj.genero = genero;
  peliculaObj.id = id;
  
  
  //cambiar boton
  formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios"
  
  editando = true;
}


// Modal
const abrirModal = document.getElementById("agregar");
const cerrarModal = document.getElementById("cerrar-modal");
const modalContainer = document.getElementsByClassName("modal-body")[0];
const modal = document.getElementsByClassName("modal")[0];

abrirModal.addEventListener("click", () => {
  modalContainer.classList.toggle("modal-active");
});

cerrarModal.addEventListener("click", () => {
  modalContainer.classList.toggle("modal-active");
  formulario.querySelector('button[type="submit"]').textContent = "Agregar"
  editando = false;
  formulario.reset();
});

modalContainer.addEventListener("click", () => {
  modalContainer.classList.toggle("modal-active");
  formulario.querySelector('button[type="submit"]').textContent = "Agregar"
  editando = false;
  formulario.reset();
});

modal.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Eliminar lista entera
const eliminarLista = document.getElementById('eliminar');
eliminarLista.addEventListener('click', () => {
  administrarPeliculas.peliculas = [];
  guardarLocal('peliculas', JSON.stringify(this.peliculas));
  while (contenedorFilms.firstChild){
    contenedorFilms.removeChild(contenedorFilms.firstChild)
  };
})

if (localStorage.getItem('peliculas') == []) {
  eventListeners();
} else {
  eventListeners();
  administrarPeliculas.peliculas = JSON.parse(localStorage.getItem('peliculas'));
}
//========== JQUERY=============//

$('#ver-peliculas').click(() => {
  ui.imprimirPeliculas(administrarPeliculas)
})