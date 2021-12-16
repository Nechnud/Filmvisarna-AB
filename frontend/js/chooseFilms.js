let jsonMovies, jsonShows, movie, age;
let trailerSRC, trialerID;
let today = new Date();

let date = today.getDate().toString() + "-" + (today.getMonth() + 1).toString() + "-" + today.getFullYear().toString();
$(function () {
  $("#datepicker").datepicker({
    //maximum 30days 
    maxDate: "+1m",
    //Start date is always today, new Date() is current date object
    minDate: new Date(),
    dateFormat: "dd-mm-yy"
  });
});

async function readInfoJson() {
  jsonMovies = await $.getJSON('json/movieinfo.json');
  jsonShows = await $.getJSON('json/shows.json');
  showAllMovies(jsonMovies);
}
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
function checkOptions() {
  if (age == 'allAge' || age == 'children17' && movie == 0) {
    showAllMovies();
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
moviesSelect.addEventListener('change', (event) => {
  movie = $("#chooseMovies :selected").val();
  age = $("#chooseAge :selected").val();
  checkOptions();
  checkTrialer();
});

$(function () {
  $("#datepicker").on('change', function () {
    date = $(this).val();
    movie = $("#chooseMovies :selected").val();
    age = $("#chooseAge :selected").val();
    checkOptions();
  });
  checkTrialer();
});

function getMovieID() {
  $('.movieAll').on('click', function () {
    //Get the id of the clicked html tag
    movieID = $(this).attr('id');
    console.log(movieID);
    //Store the movie id to localStorage so that when we change the webpage 
    //we could still get the movie id from localStorage
    localStorage.setItem('ID', movieID);
  });
}
function checkTrialer() {
  $('.trailer-button').on('click', function () {
    trialerID = $(this).attr('id');
    for (i = 0; i < jsonMovies.length; i++) {
      if (jsonMovies[i].id == trialerID) {
        trailerSRC = `${jsonMovies[i].trailer}`;
      }
    }
    $('#movieTrailer').attr('src', trailerSRC);
  });
}

let ageLimit = [];
const ageSelect = document.querySelector('#chooseAge');
ageSelect.addEventListener('change', (event) => {
  age = $("#chooseAge :selected").val();
  movie = $("#chooseMovies :selected").val();
  checkOptions();
  checkTrialer();
});
function showAllMovies() {
  html = '';
  trailerSRC = '';
  for (i = 0; i < jsonMovies.length; i++) {
    readHTML();
    $('#screening-result').html(html);
  }
  checkTrialer();
  getMovieID();
}
function filterAges() {
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

function filterMovies() {
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

function ageAndMovies() {
  html = '';
  for (j = 0; j < ageLimit.length; j++) {
    for (i = 0; i < jsonMovies.length; i++) {
      if (jsonMovies[i].rated == ageLimit[j] && movie == jsonMovies[i].id) {
        readHTML();
      }
      $('#screening-result').html(html);
    }
    if (html == '') {
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

