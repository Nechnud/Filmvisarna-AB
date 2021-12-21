let jsonMovies, jsonShows, movie, age;
let trailerSRC, trialerID;
let today = new Date();

//Date always start with today's date
let date = today.getDate().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getFullYear().toString();
$(function () { //Function for datepicker 
  $("#datepicker").datepicker({
    maxDate: "+1m", //maximum 30days 
    minDate: new Date(), //Start date is always today, new Date() is current date object
    dateFormat: "dd-mm-yy"
  });
});

async function readInfoJson() { //Read json files
  jsonMovies = await $.getJSON('json/movieinfo.json');
  jsonShows = await $.getJSON('json/shows.json');
  showAllMovies(jsonMovies);
}

//This function declare only html variable, this function will be used in several functions
function readHTML() {
  html += `
    <div class="row">
            <div class="col">
              <a href="filminfo.html"><img src="${jsonMovies[i].image_portrait_s}" id="${i + 1}" class="movieAll"></a>
            </div>
            <div class="col">
              <div id="screening-result${jsonMovies[i].id}" class="col "></div>
           
    <p class="name">${jsonMovies[i].title}</p>
    <p class="name">Salon: ${jsonShows[i].showRoom}</p>
    <p class="name">Time: ${jsonShows[i].showTime}</p>
    <p class="name">${date}</p>
    <p class="name">Rated: ${jsonMovies[i].rated}</p>
      <button id="${jsonMovies[i].id}" type="button" class="trailer-button" data-bs-toggle="modal"
              data-bs-target="#trailerModal">
              PLAY TRAILER
            </button>
            </div>
          </div>
    `;
}

function checkOptions() { //This function checks all the different combination of options from users
  if (age == 'allAge' || age == 'children17' && movie == 0) { //Same as the former function
    showAllMovies();                                          //This function will also be used several times in other functions
  }
  if (age == 'allAge' || age == 'children17' && movie != 0) {
    filterMovies();
  }
  if (age == 'children' && movie == 0) {
    ageLimit.push('G');
    filterAges(ageLimit);
  }
  if (age == 'children13' && movie == 0) {
    ageLimit.push('G');
    ageLimit.push('PG-13');
    filterAges(ageLimit);
  }
  if (age == 'children17' && movie == 0) {
    ageLimit.push('G');
    ageLimit.push('PG-13');
    ageLimit.push('R');
    filterAges(ageLimit);
  }
  if (age == 'children17' && movie != 0) {
    ageLimit.push('G');
    ageLimit.push('PG-13');
    ageLimit.push('R');
    ageAndMovies(ageLimit);
  }
  if (age == 'children' && movie != 0) {
    ageLimit.push('G');
    ageAndMovies(ageLimit);
  }
  if (age == 'children13' && movie != 0) {
    ageLimit.push('G');
    ageLimit.push('PG-13');
    ageAndMovies(ageLimit);
  }
}

const moviesSelect = document.querySelector('#chooseMovies');
moviesSelect.addEventListener('change', (event) => { //eventListener for "movies select tag" in html
  movie = $("#chooseMovies :selected").val();       //read the which movie is choosen by the user 
  age = $("#chooseAge :selected").val();
  checkOptions(); //Call two functions
  checkTrialer();
});

$(function () { //Function for datepicker 
  $("#datepicker").on('change', function () {
    date = $(this).val(); //Read in the date that are choosen by the user 
    movie = $("#chooseMovies :selected").val();
    age = $("#chooseAge :selected").val();
    checkOptions();
  });
  checkTrialer();
});

function getMovieID() {
  $('.movieAll').on('click', function () {
    movieID = $(this).attr('id');//Get the id of the clicked html tag/movie posters
    console.log(movieID);
    //Store the movie id to localStorage so that when we change the webpage 
    //we could still get the movie id from localStorage
    localStorage.setItem('ID', movieID);
  });
}


function checkTrialer() { //Function for the trialer for the different movies
  $('.trailer-button').on('click', function () {
    trialerID = $(this).attr('id'); //Get the id of the clicked "play trailer button"
    for (i = 0; i < jsonMovies.length; i++) { //Loop through and find the right trailer 
      if (jsonMovies[i].id == trialerID) {
        trailerSRC = `${jsonMovies[i].trailer}`;
      }
    }
    $('#movieTrailer').attr('src', trailerSRC);
  });
}

let ageLimit = []; //Array to store the different age standard movies 
const ageSelect = document.querySelector('#chooseAge');
ageSelect.addEventListener('change', (event) => { //EventListener for "age group select tag"
  age = $("#chooseAge :selected").val();
  movie = $("#chooseMovies :selected").val();
  checkOptions();
  checkTrialer();
});

function showAllMovies() { //Always show all movies in the beginning of the webpage 
  html = '';
  trailerSRC = '';
  for (i = 0; i < jsonMovies.length; i++) {
    readHTML();
    $('#screening-result').html(html);
  }
  checkTrialer();
  getMovieID();
}


function filterAges() { //Function for filtering the age group
  html = '';
  for (j = 0; j < ageLimit.length; j++) {
    for (i = 0; i < jsonMovies.length; i++) {
      if (jsonMovies[i].rated == ageLimit[j]) {
        readHTML();
        $('#screening-result').html(html);
      }
    }
  }
  ageLimit = [];
  checkTrialer();
  getMovieID();
}

function filterMovies() { //Function for filtering the movies 
  html = '';
  for (i = 0; i < jsonMovies.length; i++) {
    if (movie == jsonMovies[i].id) {
      readHTML();
      $('#screening-result').html(html);
    }
  }
  ageLimit = [];
  checkTrialer();
  getMovieID();
}

function ageAndMovies() { //Function for filtering both movies and age groups
  html = '';
  for (j = 0; j < ageLimit.length; j++) {
    for (i = 0; i < jsonMovies.length; i++) {
      if (jsonMovies[i].rated == ageLimit[j] && movie == jsonMovies[i].id) {
        readHTML();
      }
      $('#screening-result').html(html);
    }
    if (html == '') { //If the choosen movie doesn't match the choose age group
      html = `<p class="name">No Movie Match....</p>`;
      $('#screening-result').html(html);
      html = '';
    }
  }
  ageLimit = [];
  getMovieID();
  checkTrialer();
}

readInfoJson();

