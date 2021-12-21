
let movieID, moviePictures;
let moviePosters = '';
async function readAllMoives() { //Read json file movieinfo.json
  moviePictures = await $.getJSON('json/movieinfo.json');
  showMoviesOnScreen(); //Call the function
}

async function showMoviesOnScreen() { //Function for movie posters
  let i = 0;
  moviePosters += `<div class="row">`;
  for (let moviePicture of moviePictures) {

    moviePosters += `
        <div class="col">
          <a href="filminfo.html"><img src="${moviePicture.image_portrait_s}" 
          class="movie" id="${moviePicture.id}"></a>
        </div>
  `;
  }
  moviePosters += `</div>`;
  $('#allFilms').html(moviePosters);
  getMovieID();
}


//Codes for showing the movie information when the user click on the movie poster ---------
$('.movie').on('click', function () {
  //Get the id of the clicked html tag
  movieID = $(this).attr('id');
  //Store the movie id to localStorage so that when we change the webpage 
  //we could still get the movie id from localStorage
  localStorage.setItem('ID', movieID);
  //Call the function readShowJson(movieID)
  readShowJson(movieID);
});




