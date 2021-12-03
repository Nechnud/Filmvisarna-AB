
//Codes for showing the movie information when the user click on the movie poster ---------
let films;
let movieID;
//Get the id of the movie when the user clicks the movie poster
$('.movie').click(function () {
  movieID = $(this).attr('id');
  check(movieID);
});



async function readFilmsFromJson(movieID) {
  let html = '';
  console.log(movieID);
  films = await $.getJSON('/json/movieinfo.json');
  for (i = 0; i < films.length; i++) {
    if (films[i].id == movieID) {
      html += `
      <div class="movieInfo">
      <h6>${films[i].title}</h6>
          `;
    }
  }
  $('#movieinfoFromJsonID').html(html);
}

function check(movieID) {
  if (window.location.pathname.includes('filminfo')) {
    readFilmsFromJson(movieID);
  };
}



/*
async function readFilmsFromJson(movieID) {
  let html = '';
  films = await $.getJSON('/json/movieinfo.json');
  if (window.location.pathname.includes('filminfo')) {
    for (i = 0; i < films.length; i++) {
      if (films[i].id == movieID) {
        html += `
      <div class="movieInfo">
      <h6>${films[i].title}</h6>
          `;
      }
    }
    $('#movieinfoFromJsonID').html(html);
  }
}
readFilmsFromJson();

//-------------------------------------------------------------
*/



