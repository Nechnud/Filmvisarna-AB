
//Codes for showing the movie information when the user click on the movie poster ---------
//Sana - I haven't fixed the toggle function, will try to fix it during the weekend.
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
      <h3>${films[i].title}</h3>
      <p><b>Year: </b>${films[i].year}</p>
      <p><b>Runtime: </b>${films[i].runtime}</p>
          `;
    }
  }
  $('.' + movieID).html(html);
}
readFilmsFromJson();
//-------------------------------------------------------------
/*

$('.datepicker').datepicker({
  format: "dd/mm/yyyy",
  weekStart: 1,
  startDate: "+0d",
  endDate: "+30d",
  todayHighlight: true
});

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes()
var dateTime = date + ' ' + time;


$(datepicker).click(function (e) {
  e.preventDefault();

});
*/