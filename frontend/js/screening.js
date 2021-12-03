
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
//Different variables
let today = new Date();
let showJson;
let filmNumber;
let html;
let date;


//Read the date from datepicker
$(function () {
  $("#datepicker").on('change', function () {
    date = $(this).val();
  });
  return date;
});

//Read the json file
async function readShowJson() {
  showJson = await $.getJSON('/json/shows.json');
  showTodaysFilms();
}


//This function is not finnshed yet.....
async function showTodaysFilms() {
  html = '';
  for (i = 0; i < showJson.length; i++) {
    html += `
      <tr>
      <th>${showJson[i].title}</th>
      <th>${today.getDate()} / ${today.getMonth()} / ${today.getFullYear()}</th>
      <th>${showJson[i].showRoom}</th>
      <th>${showJson[i].showTime}</th>
      </tr>
    `;
  }
  $('.screening-result').html(html);
}
readShowJson();
//--------------------------------------
