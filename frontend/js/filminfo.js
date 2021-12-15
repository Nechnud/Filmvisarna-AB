let movieId = localStorage.getItem("ID");

let movies;
let movieToShow;
let movieData;

async function readJson() {
  let rawData = await fetch('json/movieinfo.json');
  movies = await rawData.json();
  getMovieToShow(movies);
}

readJson();

function getMovieToShow() {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id == movieId) {
      movieToShow = movies[i];
    }
  }
  renderMovieInfo(movieToShow);
}

function renderMovieInfo() {
  movieData =
    `
    <p>${movieToShow.title}</p>
    <p>Year: ${movieToShow.year}</p>
    <p>Director: ${movieToShow.director}</p>
    <p>Rated: ${movieToShow.rated}</p>
    <p>Runtime: ${movieToShow.runtime}</p>
    <p>Cast: ${movieToShow.actors}</p>
    <p>Plot: ${movieToShow.plot}</p>
           
  `;
  document.getElementById("movie-info").innerHTML = movieData;
  document.getElementById("movie-image").src = movieToShow.image_portrait_m;
}