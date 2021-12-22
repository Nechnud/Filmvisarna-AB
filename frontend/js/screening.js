let today = new Date();
let shows, html, date, address;
let dateToday = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
let freeSeats, occupiedSeats, movieSeats;
function addZero(i) { //Codes for adding "0" to the minute if the minute is smaller than 10
  if (i < 10) { i = "0" + i }
  return i;
}
let h = addZero(today.getHours());
let m = addZero(today.getMinutes());
let currentTime = h + ":" + m;

$(function () { //Function for datepicker 
  $("#datepicker").datepicker({
    //maximum 30days 
    maxDate: "+1m",
    //Start date is always today, new Date() is current date object
    minDate: new Date(),
    dateFormat: "dd-mm-yy"
  });
});

async function readShowJson() { //Read the json file and store it into 'shows' variable
  shows = await $.getJSON('json/shows.json');
  movies = await $.getJSON('json/movieinfo.json');
  currentMovie = await $.getJSON('json/ticket.json');
  checkIfSeatsAreTaken();
  showTodaysFilms();
  showTrailer(movies);
}

//This is for the movie information
//And I used localStorage to store the clicked movie poster's ID
//When the browser loads filminfo.html it fetchs the clicked movie poster's ID from localStorge.
//and shows the information on the webpage.
function showTodaysFilms() {
  html = '';
  for (let show of shows) { //Loop through 'shows'(all six films are in 'shows')
    //Fetch the movieID from localStorage with its key 'ID'
    let rightOne = localStorage.getItem('ID');
    //check which movie is clicked and get that movie's information
    if (rightOne == show.id && currentTime <= show.showTime) {

      localStorage.setItem('salon', show.showRoom);
      localStorage.setItem('date', dateToday);
      localStorage.setItem('movieTitle', show.title);
      localStorage.setItem('movieTime', show.showTime);
      html = `
      <th>${show.title}</th>
      <th>${dateToday}</th>
      <th>${show.showRoom}</th>
      <th>${show.showTime}</th>
    `;
    }

    if (rightOne == show.id && currentTime > show.showTime) {
      html = `
      <p>The movie screening has already started today. Please check another date!</p>`;
    }
  }
  $('.screening-result').html(html);
  checkIfSeatsAreTaken();
  showTrailer();
}


$(function () {
  html = '';
  $("#datepicker").on('change', function () {
    console.log(freeSeats);  //Function for datepicker
    date = $(this).val();  //Read the date that are choosen by the user 
    for (let show of shows) {
      let rightID = localStorage.getItem('ID');
      //check which movie is clicked and get that movie's information
      if (rightID == show.id) {
        localStorage.setItem('salon', show.showRoom);
        localStorage.setItem('date', date);
        localStorage.setItem('movieTitle', show.title);
        localStorage.setItem('movieTime', show.showTime);
        html = `
      <th>${show.title}</th>
      <th>${date}</th>
      <th>${show.showRoom}</th>
      <th>${show.showTime}</th>

    `;
      }
      if (date == dateToday && currentTime > show.showTime) {
        html = `
      <p>The movie screening has already started today. Please check another date!</p>`;
      }
    }
    $('.screening-result').html(html);
    checkIfSeatsAreTaken();
  });

});

function showTrailer() { //Function for movie trailer pop-up window
  for (let movie of movies) {
    let rightOne = localStorage.getItem('ID');
    if (movie.id == rightOne) {
      address = `${movie.trailer}`;
    }
  }
  document.getElementById("movieTrailer").src = address;
}

//let freeSeats, occupiedSeats, movieSeats;

function checkIfSeatsAreTaken() { //Loop and check the occupied seats

  for (let i = 0; i < currentMovie.length; i++) {

    if (currentMovie[i].movieName == localStorage.getItem('movieTitle')
      && currentMovie[i].date == localStorage.getItem('date')) {
      occupiedSeats = currentMovie[i].seatID.length;
      if (currentMovie[i].salon == 'Grande') {
        movieSeats = 66;
        freeSeats = movieSeats - occupiedSeats;
      }
      if (currentMovie[i].salon == 'Cozy') {
        movieSeats = 48;
        freeSeats = movieSeats - occupiedSeats;
      }
    }
    if (currentMovie[i].movieName != localStorage.getItem('movieTitle')
      || currentMovie[i].date != localStorage.getItem('date')) {
      if (currentMovie[i].salon == 'Grande') {
        movieSeats = 66;
        freeSeats = movieSeats;
      }
      if (currentMovie[i].salon == 'Cozy') {
        movieSeats = 48;
        freeSeats = movieSeats;
      }
    }
    if (date != dateToday || currentTime <= localStorage.getItem('movieTime')) {
      html += `
    <th>${freeSeats} free of ${movieSeats}</th>`;

    }
    if (date == dateToday && currentTime > localStorage.getItem('movieTime')) {
      html = `
      <p>The movie screening has already started today. Please check another date!</p>`;
    } $('.screening-result').html(html);
  }
}
readShowJson();