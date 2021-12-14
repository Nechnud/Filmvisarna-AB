//All the codes here are for checking the screening of movies -----------------

//Date picker Jquery
$(function () {
  $("#datepicker").datepicker({
    //maximum 30days 
    maxDate: "+1m",
    //Start date is always today, new Date() is current date object
    minDate: new Date(),
    dateFormat: "dd-mm-yy"
  });
});
//Different variables
let today = new Date();
let shows, html, date, address;

//Read the json file and store it into 'shows' variable
async function readShowJson() {
  shows = await $.getJSON('json/shows.json');
  movies = await $.getJSON('json/movieinfo.json');
  showTodaysFilms();
}

//This is for the movie information
//And I used localStorage to store the clicked movie poster's ID
//When the browser loads filminfo.html it fetchs the clicked movie poster's ID from localStorge.
//and shows the right information on the webpage.
async function showTodaysFilms() {
  html = '';
  //Loop through 'shows'(all six films are in 'shows')
  for (let show of shows) {
    //Fetch the movieID from localStorage with its key 'ID'
    let rightOne = localStorage.getItem('ID');
    //check which movie is clicked and get that movie's information
    if (rightOne == show.id) {
      let dataToday = today.getDate().toString() + "-" + today.getMonth().toString() + "-" + today.getFullYear().toString();
      localStorage.setItem('salong', show.showRoom);
      localStorage.setItem('date', dataToday);
      localStorage.setItem('movieTitle', show.title);
      html += `
      <th>${show.title}</th>
      <th>${today.getDate()} / ${today.getMonth()} / ${today.getFullYear()}</th>
      <th>${show.showRoom}</th>
      <th>${show.showTime}</th>
    `;
    }
  }
  //Tell the html tag to show the information of the movie
  $('.screening-result').html(html);
  showTrailer();
}
//Declare the function readShowJson();
readShowJson();
$(function () {
  html = '';
  $("#datepicker").on('change', function () {
    date = $(this).val();
    for (let show of shows) {
      let rightOne = localStorage.getItem('ID');

      //check which movie is clicked and get that movie's information
      if (rightOne == show.id) {
        localStorage.setItem('salong', show.showRoom);
        localStorage.setItem('date', date);
        localStorage.setItem('movieTitle', show.title);
        html = `
      <th>${show.title}</th>
      <th>${date}</th>
      <th>${show.showRoom}</th>
      <th>${show.showTime}</th>
    `;
      }
      $('.screening-result').html(html);
    }
  });
});

//read movieinfo.json file to 'movies'
async function readMovieJson() {
  movies = await $.getJSON('json/movieinfo.json');
  showTrailer(movies);
}

//Function for movie trailer pop-up window
function showTrailer() {
  for (let movie of movies) {
    let rightOne = localStorage.getItem('ID');
    if (movie.id == rightOne) {
      address = `${movie.trailer}`;
    }
  }
  document.getElementById("movieTrailer").src = address;
}


