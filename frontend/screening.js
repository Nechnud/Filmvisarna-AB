let date;
async function readShowJson() {
  showJson = await $.getJSON('/json/shows.json');
}
$(function () {
  $("#datepicker").on('change', function () {
    date = $(this).val();
  });
  return date;
});

let filmsScreening, dateScreening, salongScreening;
const selectFilm = document.querySelector('#select-film');
selectFilm.addEventListener('click', (event) => {
  html = '';
  filmsScreening = $("#filmsToShow :selected").val();;
  console.log(filmsScreening);
  salongScreening = $("#salong :selected").val();

  if (filmsScreening == 'All Films' && salongScreening == 'All Salongs') {
    for (i = 0; i < showJson.length; i++) {
      html += `
      <tr>
      <th>${showJson[i].title}</th>
      <th>${date}</th>
      <th>${showJson[i].showRoom}</th>
      <th>${showJson[i].showTime}</th>
      </tr>
    `;
    }
  }
  if (filmsScreening == 'All Films' && salongScreening != 'All Salongs') {
    for (i = 0; i < showJson.length; i++) {
      if (showJson[i].showRoom === salongScreening) {
        html += `
      <tr>
      <th>${showJson[i].title}</th>
      <th>${date}</th>
      <th>${showJson[i].showRoom}</th>
      <th>${showJson[i].showTime}</th>
      </tr>
    `;
      }
    }
  }
  if (filmsScreening !== 'All Films' && salongScreening === 'All Salongs') {
    for (i = 0; i < showJson.length; i++) {
      if (filmsScreening == showJson[i].title) {
        html += `
      <tr class="table-result">
      <th>${filmsScreening}</th>
      <th>${date}</th>
      <th>${showJson[i].showRoom}</th>
      <th>${showJson[i].showTime}</th>
      </tr>
      `;
      }
    }
  }
  if (filmsScreening !== 'All Films' && salongScreening !== 'All Salongs') {
    for (i = 0; i < showJson.length; i++) {
      if (filmsScreening == showJson[i].title && salongScreening == showJson[i].showRoom) {
        html += `
      <tr class="table-result">
      <th>${filmsScreening}</th>
      <th>${date}</th>
      <th>${showJson[i].showRoom}</th>
      <th>${showJson[i].showTime}</th>
      </tr>
      `;
      }
      else {
        alert("No film matches! Choose again!");
        html = '';
        $('.screening-result').html(html);
        return;
      }
    }
  }
  if (date == undefined) {
    alert("Please choose the date!")
  }

  $('.screening-result').html(html);
});



