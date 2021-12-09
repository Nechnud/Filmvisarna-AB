//Declare a variable for json;
let moviehalls;
let salongID;
let salongSeats;
//Get the Salong information from localStorage which was stored in filminfo.html
let rightSalong = localStorage.getItem('salong');

//Function that reads the json file
async function readMovieHall() {
  let rawData = await fetch('json/moviehalls.json');
  moviehalls = await rawData.json();

  //Call the functions with matching salong
  showSeats(moviehalls);
}
let seats = '';
function showSeats() {

  if (rightSalong == 'Grande') {
    salongID = 0;
  }
  if (rightSalong == 'Cozy') {
    salongID = 1;
  }

  // moviehalls[0] is 'Grande', moviehalls[0].seatsPerRow is the total row of seats
  for (i = 0; i < moviehalls[salongID].seatsPerRow.length; i++) {
    //Add div tag with class row in this loop to create the total row of seats
    let idForRow = "row" + (1 + i).toString();
    seats += `<div class="row" id="${idForRow}">`;

    //moviehalls[0].seatsPerRow[i] is chair 
    for (j = 0; j < moviehalls[salongID].seatsPerRow[i]; j++) {
      //get a variable which creates a id for every seat, 
      //so that it become easier to know which seats are choosen by the user 
      let idForSeat = (1 + i).toString() + (j + 1).toString();
      // assign a div tag with class col in this loop to create the seats
      seats += `
      <div class="seat" id="${idForSeat}"></div>
      `;
    }

    //here add a div close tag for the row that we got in the first loop
    seats += `</div>`;

    if (seats !== undefined) {
      document.getElementById("rowForSeats").innerHTML = seats;
    }
  }
  salongSeats = document.querySelectorAll(".seat");
  checkSelectedSeats(salongSeats);
}
readMovieHall();

function checkSelectedSeats() {
  for (let salongSeat of salongSeats) {
    salongSeat.addEventListener('click', function () {
      if ($(this).css("background-color") == 'rgb(1, 22, 62)') {
        $(this).css({ backgroundColor: "#31d7a9" });
      }
      if ($(this).css("background-color") == 'rgb(111, 234, 246)')
        $(this).css({ backgroundColor: '#01163e' });
    })
  }

  console.log(salongSeats);
}