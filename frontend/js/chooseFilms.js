let jsonMovies, jsonShows;
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

async function showAllMovies() {
  html = '';
  trailerSRC = '';
  for (i = 0; i < jsonMovies.length; i++) {
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
      <button id="${jsonMovies[i].id}" type="button" class="trailer-button" data-bs-toggle="modal"
              data-bs-target="#trailerModal">
              PLAY TRAILER
            </button>
            </div>
          </div>
    `;
    $('#screening-result').html(html);
  }
  checkTrialer();
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

let movie;
const moviesSelect = document.querySelector('#chooseMovies');
moviesSelect.addEventListener('change', (event) => {
  movie = $("#chooseMovies :selected").val();
  if (movie == 0) {
    showAllMovies();
  }
  else {
    switchMovie(movie);
  }
  checkTrialer();
});


$(function () {
  $("#datepicker").on('change', function () {
    date = $(this).val();
    movie = $("#chooseMovies :selected").val();
    if (movie == 0) {
      showAllMovies();
    }
    else {
      switchMovie(movie);
    }
  });
});

async function switchMovie() {
  for (i = 0; i < jsonMovies.length; i++) {
    if (movie == jsonMovies[i].id) {
      html = `
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
      <button id="${jsonMovies[i].id}" type="button" class="trailer-button" data-bs-toggle="modal"
              data-bs-target="#trailerModal">
              PLAY TRAILER
            </button>
            </div>
          </div>
    `;
      $('#screening-result').html(html);
    }
  }
  getMovieID();
}

function getMovieID() {
  $('.movieAll').on('click', function () {
    //Get the id of the clicked html tag
    movieID = $(this).attr('id');
    //Store the movie id to localStorage so that when we change the webpage 
    //we could still get the movie id from localStorage
    localStorage.setItem('ID', movieID);
  });
}
readInfoJson();

