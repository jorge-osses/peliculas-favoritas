function Pelicula(name, year, director, genero) {
  this.name = name;
  this.year = year;
  this.director = director;
  this.genero = genero;
}

function updateStorage(arrayPeliculas) {
  localStorage.setItem("peliculas", JSON.stringify(arrayPeliculas));
  console.log("Se actualizo la lista de Peliculas");
}
  
function cargarPelicula(arrayPeliculas) {
  let name = prompt("ingrese el nombre de una Película");
  let year = prompt("ingrese el año de esa Película");
  let director = prompt("Por favor, ingrese el nombre del Director de la Película");
  let genero = prompt("De que género es la Película");

  const nuevaPelicula = new Pelicula(name, year, director, genero);
  arrayPeliculas.push(nuevaPelicula);
  console.log("Se agregó la Película a tu lista");
  updateStorage(arrayPeliculas);
}

function ordenarPeliculas(arrayPeliculas) {
  function comparar(a, b) {
    return a.year - b.year;
  }
  console.log(arrayPeliculas.sort(comparar))
}
  
function mostrarPeliculas(arrayPeliculas) {
  if (arrayPeliculas.length) {
    for (i = 0; i < arrayPeliculas.length; i++) {
      console.log("Película Nº " + (i + 1) + ": ");
      console.log(arrayPeliculas[i]);
    }
  } else {
    console.log("Lo Siento, pero aquí no hay películas.");
  }
}
  
function eliminarPeliculas() {
  arrayPeliculas = [];
  console.log("se borraron todas las Películas");
  updateStorage(arrayPeliculas);
}

let arrayPeliculas = [];

  
arrayPeliculas = JSON.parse(localStorage.getItem("peliculas"));
console.log("se inicializa local storage");
  
let menu = prompt(
  "ingrese una opción: \n 1: Cargar Película \n 2: Mostrar Películas por consola \n 3: Eliminar todas las Películas \n 4: ordenar Películas por año \n 5: Salir"
);

  
while (menu !== "5") {
  if (menu === "1") {
    cargarPelicula(arrayPeliculas);
  }
  if (menu === "2") {
    mostrarPeliculas(arrayPeliculas);
  }
  if (menu === "3") {
    eliminarPeliculas(arrayPeliculas);
  }
  if (menu === "4") {
    ordenarPeliculas(arrayPeliculas);
  }

 menu = prompt(
   "ingrese una opción: \n 1: Cargar Película \n 2: Mostrar Películas por consola \n 3: Eliminar todas las Películas \n 4: ordenar Películas por año \n 5: Salir"
 );
}
alert("muchas gracias.")