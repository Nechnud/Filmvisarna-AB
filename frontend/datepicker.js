
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

let showJson;
let filmNumber;


async function readShowJson() {
  showJson = await $.getJSON('/json/shows.json');
}

const filmsSelect = document.querySelector('#filmsToShow');
filmsSelect.addEventListener('change', (event) => {
  let html = '';
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


//These codes are not ready yet! ------------------------- Have a nice weekend!
let date, dateToShow;
$(function () {
  $("#datepicker").on('change', function () {
    date = $(this).val();
    console.log(date);
    if (filmNumber === 'All Films') {
      for (i = 0; i < showJson.length; i++) {
        dateToShow = `
          <td>${date}</td>   
          `;
      }
    }
    if (filmNumber != 'All Films') {
      dateToShow += `
      <td>${date}</td>   
      `;
    }
    $('.table-result').html(date);
  });
});


const salongSelect = document.querySelector('#salong');
salongSelect.addEventListener('change', (event) => {
  let date = '';
  if (filmNumber === 'All Films') {

  }
});
//These codes are not ready yet! -------------------------