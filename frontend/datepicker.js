
//Date picker Jquery
$(document).ready(function () {
  $("#datepicker").datepicker({
    //maximum 30days 
    maxDate: "+1m",
    //Start date is always today, new Date() is current date object
    minDate: new Date(),
    dateFormat: "dd-mm-yy"
  });
});
let today = new Date();
let showJson;
let filmNumber;
let html;

async function readShowJson() {
  showJson = await $.getJSON('/json/shows.json');
  showTodaysFilms();
}

async function showTodaysFilms() {
  html = '';
  for (i = 0; i < showJson.length; i++) {
    html += `
      <tr>
      <th>${showJson[i].title}</th>
      <th>${today.getDate()} / ${today.getMonth()} / ${today.getFullYear()}</th>
      <th>${showJson[i].showRoom}</th>
      <th>${showJson[i]}</th>
      </tr>
    `;
  }
  $('.screening-result').html(html);
  console.log(html);
}
readShowJson();


const filmsSelect = document.querySelector('#filmsToShow');
filmsSelect.addEventListener('change', (event) => {
  html = '';
  filmNumber = event.target.value;
  readShowJson();
  if (event.target.value === 'All Films') {
    for (i = 0; i < showJson.length; i++) {
      html += `
      <tr>
      <th>${showJson[i].title}</th>
      </tr>
    `;
    }
  }
  if (event.target.value != 'All Films') {

    html += `
      <tr class="table-result">
      <th>${event.target.value}</th>   
      </tr>
      `;
  }
  //console.log(event.target.value);
  $('.screening-result').html(html);
  return filmNumber;
});
/*

//These codes are not ready yet! ------------------------- Have a nice weekend!
let date, dateToShow;
$(function () {
  $("#datepicker").on('change', function () {
    date = $(this).val();
  }
  });


  const salongSelect = document.querySelector('#salong');
  salongSelect.addEventListener('change', (event) => {
    let date = '';
    if (filmNumber === 'All Films') {

    }
  });
//These codes are not ready yet!
*/
