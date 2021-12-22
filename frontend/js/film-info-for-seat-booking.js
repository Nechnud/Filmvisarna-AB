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
    <div class="col">
    <img src="${movieImage}">
    </div>
    <div class="col">
    <h5>${localStorage.getItem('movieTitle')}</h5>
    <h5>Date: ${localStorage.getItem('date')}</h5>
    <h5>Time: ${localStorage.getItem('movieTime')}</h5>
    <h5>Salon: ${localStorage.getItem('salon')}</h5>
    </div>      
           
  `;
  document.getElementById("film-info-booking").innerHTML = movieData;
}


$('#book').on('click', function () {
  readTickets();
  //When the user clicks the book button on seatBooking.html
});               //The program creates the new ticket for the user 

