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
    ${movieToShow.title}
    ${movieToShow.year}
    ${movieToShow.runtime}
    ${movieToShow.director}        
  `;
  document.getElementById("movie-info").innerText = movieData;
  document.getElementById("movie-image").src = movieToShow.image_portrait_m;
  document.getElementById("movie-trailer").src = movieToShow.trailer;
}