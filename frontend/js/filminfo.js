
let movieId = 1;
let movies;
let movieToShow;

async function readJson() {
  let rawData = await fetch('movieinfo.json');
  movies = await rawData.json();
}

readJson();

console.log(movies);

for (let i = 0; i < movies.length; i++) {
  if (movies[i].id === movieID) {
    movieToShow = movies[i];
  }
}

function renderMovieInfo() {
  `
    <h1>${movieToShow.title}</h1>
    <h2>${movieToShow.year}</h2>
    <h2>${movieToShow.runtime}</h2>
    <h2>${movieToShow.director}</h2>        
  `
}

document.getElementById("movie-info").innerText = renderMovieInfo();
document.getElementById("movie-image").src = movieToShow.image_portrait_m;
document.getElementById("movie-trailer").src = movieToShow.trailer;


/*if (movieId === 1) {
  document.getElementById("movie-info").innerText = renderMovieInfo();
  document.getElementById("movie-image").src = movieToShow.image_portrait_m;
  document.getElementById("movie-trailer").src = movieToShow.trailer;
}

if (movieId === 2) {
  document.getElementById("movie-info").innerText = "Joker";
  document.getElementById("movie-image").src = "images/jokerM.jpg";
  document.getElementById("movie-trailer").src = "https://www.youtube.com/embed/zAGVQLHvwOY";
}

if (movieId === 3) {
  document.getElementById("movie-info").innerText = "Aladdin";
  document.getElementById("movie-image").src = "images/aladdinM.jpg";
  document.getElementById("movie-trailer").src = "https://www.youtube.com/embed/eTjHiQKJUDY";
}

if (movieId === 4) {
  document.getElementById("movie-info").innerText = "My Neighbour Totoro";
  document.getElementById("movie-image").src = "images/totoroM.jpg";
  document.getElementById("movie-trailer").src = "https://www.youtube.com/embed/92a7Hj0ijLs";
}

if (movieId === 5) {
  document.getElementById("movie-info").innerText = "Interstellar";
  document.getElementById("movie-image").src = "images/interstellarM.jpg";
  document.getElementById("movie-trailer").src = "https://www.youtube.com/embed/zSWdZVtXT7E";
}

if (movieId === 6) {
  document.getElementById("movie-info").innerText = "Spider-Man: No way home";
  document.getElementById("movie-image").src = "images/spidermanM.jpg";
  document.getElementById("movie-trailer").src = "https://www.youtube.com/embed/JfVOs4VSpmA";
}
*/
