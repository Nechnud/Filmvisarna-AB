//Read all the options that are made by the user and show the result on the screening list


let filmsScreening, ageGroup;
let readJson2;
let trailerSRC, video;
async function readInfoJson() {
  readJson2 = await $.getJSON('json/movieinfo.json');
  showAllMovies(readJson2);
}

async function showAllMovies() {
  html = '';
  trailerSRC = '';

  for (i = 0; i < readJson2.length; i++) {
    html += `
    <div class="row">
            <div class="col">
              <a href="filminfo.html"><img src="${readJson2[i].image_portrait_s}" id="${i + 1}" class="movieAll"></a>
            </div>
            <div class="col">
              <div id="screening-result${readJson2[i].id}" class="col "></div>
           
    <p class="name">${readJson2[i].title}</p>
      <button id="${readJson2[i].title}" type="button" class="trailer-button" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              PLAY TRAILER
            </button>
            </div>
          </div>
    `;
    $('#screening-result').html(html);
  }

  $('.trailer-button').on('click', function () {
    video = $(this).attr('id');
    for (i = 0; i < readJson2.length; i++) {
      if (readJson2[i].title == video) {
        trailerSRC = `${readJson2[i].trailer}`;
      }
    }
    $('#movieTrailer').attr('src', trailerSRC);
  });
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

