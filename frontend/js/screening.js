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

//Read the json file and store it into 'shows' variable
async function readShowJson() {
  shows = await $.getJSON('json/shows.json');
  showTodaysFilms(movieID);
}

//This is for the movie information
//And I used localStorage to store the clicked movie poster's ID
//When the browser loads filminfo.html it fetchs the clicked movie poster's ID from localStorge.
//and shows the right information on the webpage.
async function showTodaysFilms() {
  html = '';
  //Loop through 'shows'(all six films are in 'shows')
  for (let show of shows) {
    //Fetch the movieID from localStorage with its key 'ID'
    let rightOne = localStorage.getItem('ID');
    //check which movie is clicked and get that movie's information
    if (rightOne == show.id) {
      html += `
      <tr>
      <th>${show.title}</th>
      <th>${today.getDate()} / ${today.getMonth()} / ${today.getFullYear()}</th>
      <th>${show.showRoom}</th>
      <th>${show.showTime}</th>
      </tr>
    `;
    }
  }
  //Tell the html tag to show the information of the movie
  $('.screening-result').html(html);

}
//Declare the function readShowJson();
readShowJson();


//If the user decides to choose a date on filminfo.html page 
//This method starts when the user click on the "choose" button
let selectFilm = document.querySelector('#select-film');
selectFilm.addEventListener('click', (event) => {
  html = '';
  for (let show of shows) {
    let rightOne = localStorage.getItem('ID');
    //check which movie is clicked and get that movie's information
    if (rightOne == show.id) {
      html += `
      <tr>
      <th>${show.title}</th>
      <th>${date}</th>
      <th>${show.showRoom}</th>
      <th>${show.showTime}</th>
      </tr>
    `;
    }
    //If the user forget to choose the date, the program alters a message.
    if (date == undefined) {
      html = '';
      alert("Please choose the date!");
    }
  }
  //Show the selected result on the screening-list table
  $('.screening-result').html(html);
});