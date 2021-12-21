let today = new Date();
let shows, html, date, address;


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
  showTodaysFilms();
  showTrailer(movies);
}

//This is for the movie information
//And I used localStorage to store the clicked movie poster's ID
//When the browser loads filminfo.html it fetchs the clicked movie poster's ID from localStorge.
//and shows the information on the webpage.
async function showTodaysFilms() {
  html = '';
  for (let show of shows) { //Loop through 'shows'(all six films are in 'shows')
    //Fetch the movieID from localStorage with its key 'ID'
    let rightOne = localStorage.getItem('ID');
    //check which movie is clicked and get that movie's information
    if (rightOne == show.id) {
      let dataToday = today.getDate().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getFullYear().toString();
      localStorage.setItem('salong', show.showRoom);
      localStorage.setItem('date', dataToday);
      localStorage.setItem('movieTitle', show.title);
      html += `
      <th>${show.title}</th>
      <th>${dataToday}</th>
      <th>${show.showRoom}</th>
      <th>${show.showTime}</th>
    `;
    }
  }
  $('.screening-result').html(html);
  showTrailer();
}


$(function () {
  html = '';
  $("#datepicker").on('change', function () { //Function for datepicker 
    date = $(this).val();  //Read the date that are choosen by the user 
    for (let show of shows) {
      let rightID = localStorage.getItem('ID');
      //check which movie is clicked and get that movie's information
      if (rightID == show.id) {
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

function showTrailer() { //Function for movie trailer pop-up window
  for (let movie of movies) {
    let rightOne = localStorage.getItem('ID');
    if (movie.id == rightOne) {
      address = `${movie.trailer}`;
    }
  }
  document.getElementById("movieTrailer").src = address;
}

readShowJson();