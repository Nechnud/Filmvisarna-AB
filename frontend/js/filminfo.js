let rightID = check();
console.log(rightID);

let movieId = 2;

if (movieId === 1) {
  document.getElementById("movie-title").innerText = "The Day After Tomorrow";
  document.getElementById("movie-image").src = "images/dayAfterTomorrow.jpg";
  document.getElementById("movie-link").src = "https://www.youtube.com/embed/Ku_IseK3xTc";
}

if (movieId === 2) {
  document.getElementById("movie-title").innerText = "Joker";
  document.getElementById("movie-image").src = "images/joker.jpg";
  document.getElementById("movie-link").src = "https://www.youtube.com/embed/zAGVQLHvwOY";
}

if (movieId === 3) {
  document.getElementById("movie-title").innerText = "Aladdin";
  document.getElementById("movie-image").src = "images/aladdin.jpg";
  document.getElementById("movie-link").src = "https://www.youtube.com/embed/eTjHiQKJUDY";
}

if (movieId === 4) {
  document.getElementById("movie-title").innerText = "My Neighbour Totoro";
  document.getElementById("movie-image").src = "images/totoro.jpg";
  document.getElementById("movie-link").src = "https://www.youtube.com/embed/92a7Hj0ijLs";
}

if (movieId === 5) {
  document.getElementById("movie-title").innerText = "Interstellar";
  document.getElementById("movie-image").src = "images/interstellar.jpg";
  document.getElementById("movie-link").src = "https://www.youtube.com/embed/zSWdZVtXT7E";
}

if (movieId === 6) {
  document.getElementById("movie-title").innerText = "Spider-Man: No way home";
  document.getElementById("movie-image").src = "images/spiderman.jpg";
  document.getElementById("movie-link").src = "https://www.youtube.com/embed/JfVOs4VSpmA";
}