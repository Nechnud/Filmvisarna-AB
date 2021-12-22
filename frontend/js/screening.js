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

function setSalonSeat() {
  if (localStorage.getItem('salon') == 'Grande') {
    movieSeats = 66;
    freeSeats = movieSeats;
  }
  else {
    movieSeats = 48;
    freeSeats = movieSeats;
  }
}

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
  showTodaysFilms();
}

//This is for the movie information
//And I used localStorage to store the clicked movie poster's ID
//When the browser loads filminfo.html it fetchs the clicked movie poster's ID from localStorge.
//and shows the information on the webpage.
async function showTodaysFilms() {
  setSalonSeat();
  html = '';
  for (let show of shows) { //Loop through 'shows'(all six films are in 'shows')
    //Fetch the movieID from localStorage with its key 'ID'
    let rightOne = localStorage.getItem('ID');
    //check which movie is clicked and get that movie's information
    if (rightOne == show.id && currentTime <= show.showTime) {
      $('#bookTickets').prop('disabled', false);
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
      $('#bookTickets').prop('disabled', true);
    } $('.screening-result').html(html);
  }
  checkIfSeatsAreTaken();
  showTrailer();
}

//Function for datepicker
html = '';
setSalonSeat();

$("#datepicker").on('change', function () {

  date = $(this).val();  //Read the date that are choosen by the user 
  for (let show of shows) {
    let rightID = localStorage.getItem('ID');//check which movie is clicked and get that movie's information
    if (rightID == show.id) {
      $('#bookTickets').prop('disabled', false);
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
      $('#bookTickets').prop('disabled', true);
    }

  } checkIfSeatsAreTaken();
});


function checkIfSeatsAreTaken() {
  setSalonSeat();
  if (currentMovie.length != 0) {//Loop and check the occupied seats
    for (let i = 0; i < currentMovie.length; i++) { //this function writes out the available seats
      if (currentMovie[i].movieName === localStorage.getItem('movieTitle')
        && currentMovie[i].date == localStorage.getItem('date')) {
        occupiedSeats = currentMovie[i].seatID.length;
        if (localStorage.getItem('salon') == 'Grande') {
          freeSeats = movieSeats - occupiedSeats;
          console.log(freeSeats)
        }
        if (localStorage.getItem('salon') == 'Cozy') {
          freeSeats = movieSeats - occupiedSeats;
          console.log(freeSeats)
        }
      }
    }
    html += `<th> ${freeSeats} free of ${movieSeats}</th >`;
    if ($('#bookTickets').attr('disabled') == 'disabled') {
      html = `<th>The movie screening has already started today. Please check another date!</th>`;
    }
    $('.screening-result').html(html);
  }
}

function showTrailer() { //Function for movie trailer pop-up window
  for (let movie of movies) {
    let rightOne = localStorage.getItem('ID');
    if (movie.id == rightOne) {
      address = `${movie.trailer} `;
    }
  }
  document.getElementById("movieTrailer").src = address;
}
readShowJson();