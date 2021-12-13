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

let seatID;
let selectedSeatsToShow;
async function readSelectedSeats() {
  let seatList = localStorage.getItem('selectedSeats');
  console.log(seatList);
  for (let i = 0; i < seatList.length; i++) {
    seatID = seatList[i];
    selectedSeatsToShow += `
  <p>Row ${seatID.charAt(0)} Chair ${seatID.substring(1)}</p>
  `;
  }
  $('.seatsNumber').html(selectedSeatsToShow);
}

$('#book').on('click', function () {

});

