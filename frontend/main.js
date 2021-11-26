
//Codes for showing the movie information when the user click on the movie poster ---------
//Sana - I haven't fixed the toggle function, will try to fix it during the weekend.
//Sana - I am going to write the movieinfo.html code as well.....
let films;
let movieID;

$('.movie').click(function () {
  movieID = $(this).attr('id');
  readFilmsFromJson(movieID);

  $(this).find('.movieInfo').toggle();
});

async function readFilmsFromJson(movieID) {
  let html = '';
  films = await $.getJSON('/json/movieinfo.json');
  for (i = 0; i < films.length; i++) {
    if (films[i].id == movieID) {

      html += `
      <div class="movieInfo">
      <h6>${films[i].title}</h6>
      <p><b>Year: </b>${films[i].year}</p>
      <p><b>Runtime: </b>${films[i].runtime}</p>
          `;
    }
  }
  $('.' + movieID).html(html);
}
readFilmsFromJson();
<<<<<<< HEAD
//-------------------------------------------------------------
=======
>>>>>>> bed5573ea6eb594c317c53b9414393fb6d4065ff
