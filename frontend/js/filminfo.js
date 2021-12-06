
let movieId;
let movies;

async function readJson() {
  let rawData = await fetch('movieinfo.json');
  movies = await rawData.json();
}

function renderMovieInfo() {
  document.querySelector('#movie-info').innerHTML =
    movieInfo.map(function (movie) {
      return `
        <div id="movie-info">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <h5>Price: ${product.price}</h5>
        </div>
      `
    }).join('');
}


/* if (movieId === 1) {
  document.getElementById("movie-info").innerText = "The Day After Tomorrow";
  document.getElementById("movie-image").src = "images/dayAfterTomorrowM.jpg";
  document.getElementById("movie-trailer").src = "https://www.youtube.com/embed/Ku_IseK3xTc";
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

