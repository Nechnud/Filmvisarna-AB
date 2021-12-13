let movieImage;
async function readJson() {
  let rawData = await fetch('json/movieinfo.json');
  movies = await rawData.json();
  renderMovieInfo(movies);
}

readJson();

function renderMovieInfo() {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title == localStorage.getItem('movieTitle')) {
      movieImage = movies[i].image_portrait_s;
    }
  }
  movieData =
    `
    <p>${localStorage.getItem('movieTitle')}</p>
    <p>Date: ${localStorage.getItem('date')}</p>
    <p>Salon: ${localStorage.getItem('salong')}</p>
    <img src="${movieImage}">
    
           
  `;
  document.getElementById("film-info-booking").innerHTML = movieData;
}


$('#book').on('click', function () {
  readTickets();
  //When the user clicks the book button on seatBooking.html
});               //The program creates the new ticket for the user 

