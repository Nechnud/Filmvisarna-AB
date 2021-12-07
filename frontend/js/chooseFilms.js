//Read all the options that are made by the user and show the result on the screening list
let filmsScreening, dateScreening, salongScreening;
//This method starts when the user click on the "select" button
selectFilm.addEventListener('click', (event) => {
  html = '';
  salongScreening = $("#salong :selected").val();

  //There are four if statements to match the user's option
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
      //If there is no match the program alters a message to the user
      else {
        alert("No film matches! Choose again!");
        html = '';
        $('.screening-result').html(html);
        return;
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