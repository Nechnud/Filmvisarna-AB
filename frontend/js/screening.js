//All the codes here are for checking the screening of movies -----------------

//Date picker Jquery
$(function () {
  $("#datepicker").datepicker({
    //maximum 30days 
    maxDate: "+1m",
    //Start date is always today, new Date() is current date object
    minDate: new Date(),
    dateFormat: "dd-mm-yy"
  });
});
//Different variables
let today = new Date();
let shows, html, date;

//Read the date from datepicker
$(function () {
  $("#datepicker").on('change', function () {
    date = $(this).val();
  });
  return date;
});

//Read the json file
async function readShowJson() {
  shows = await $.getJSON('json/shows.json');
  showTodaysFilms();
}

//This function is not finnshed yet.....
//This is for the movie information
async function showTodaysFilms() {
  html = '';
  for (let show of shows) {
    html += `
      <tr>
      <th>Not finished the code yet</th>
      <th>${today.getDate()} / ${today.getMonth()} / ${today.getFullYear()}</th>
      <th>${shows[i].showRoom}</th>
      <th>${shows[i].showTime}</th>
      </tr>
    `;
  }
  $('.screening-result').html(html);
}
readShowJson();
//--------------------------------------

//Codes below are not finished yet....................
//Part of them works, the parts that work are (salong button, date picker)
//Read all the options that are made by the user and show the result on the screening list
let dateScreening, salongScreening;
//This method starts when the user click on the "select" button
let selectFilm = document.querySelector('#select-film');
selectFilm.addEventListener('click', (event) => {
  html = '';
  salongScreening = $("#salong :selected").val();
  if (salongScreening == 'All Salongs') {
    for (i = 0; i < shows.length; i++) {
      html += `
      <tr>
      <th>Not finished the code yet</th>
      <th>${date}</th>
      <th>${shows[i].showRoom}</th>
      <th>${shows[i].showTime}</th>
      </tr>
    `;
    }
  }
  if (salongScreening != 'All Salongs') {
    for (i = 0; i < shows.length; i++) {
      if (shows[i].showRoom === salongScreening) {
        html += `
      <tr>
      <th>Not finished the code yet</th>
      <th>${date}</th>
      <th>${shows[i].showRoom}</th>
      <th>${shows[i].showTime}</th>
      </tr>
    `;
      }
    }
  }
  //If the user forget to choose the date, the program alters a message.
  if (date == undefined) {
    html = '';
    alert("Please choose the date!");
  }
  //Show the selected result on the screening-list table
  $('.screening-result').html(html);
});