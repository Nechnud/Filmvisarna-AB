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
  //There are four if statements to match the user's option
  for (i = 0; i < readJson2.length; i++) {
    html = `
    
    <p class="name">${readJson2[i].title}</p>
      <button id="${readJson2[i].title}" type="button" class="trailer-button" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              PLAY TRAILER
            </button>
    `;
    $('#screening-result' + `${readJson2[i].id}`).html(html);
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
}

$('.movieAll').on('click', function () {
  //Get the id of the clicked html tag
  movieID = $(this).attr('id');
  //Store the movie id to localStorage so that when we change the webpage 
  //we could still get the movie id from localStorage
  localStorage.setItem('ID', movieID);
  //Call the function readShowJson(movieID)
  //This function is in 'screening.js' file
  let check = localStorage.getItem('ID');
  console.log(check);
});

readInfoJson();

