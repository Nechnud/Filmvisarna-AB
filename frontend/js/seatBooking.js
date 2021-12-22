let moviehalls, salonID, salonSeats;
let rightSalon = localStorage.getItem('salon'); //Get salon information from localStorage


async function readMovieHall() { //Function that reads the json file
  let rawData = await fetch('json/moviehalls.json');
  moviehalls = await rawData.json();
  showSeats(moviehalls);
}

let seats = '';
function showSeats() { //Function to show the cinema seats based on the salon

  if (rightSalon == 'Grande') {
    salonID = 0;
  }
  if (rightSalon == 'Cozy') {
    salonID = 1;
  }

  //Loop through each row and seats to write them out on the screen
  for (i = 0; i < moviehalls[salonID].seatsPerRow.length; i++) {

    let idForRow = "row" + (1 + i).toString(); //idForRow 
    seats += `<div class="row" id="${idForRow}">`;//the total row of seats

    for (j = 0; j < moviehalls[salonID].seatsPerRow[i]; j++) {

      let idForSeat = (1 + i).toString() + (j + 1).toString(); //A variable which creates a id for every seat
      // assign a div tag with class col in this loop to create the seats
      seats += `
      <button class="seat" id="${idForSeat}"></button>
      `;
    }

    //here add a div close tag for the row that we got in the first loop
    seats += `</div>`;

    document.getElementById("rowForSeats").innerHTML = seats;
  }

  salonSeats = document.querySelectorAll(".seat"); //Select all the seats
  checkIfSeatsAreTaken(); //This function checks the occupied seats

  checkSelectedSeats(salonSeats); //This function check the users' selected seats 

}

readMovieHall();

//Create two variables
let listOfSeats = []; //this array stores the selected seats
let seatNum, seatRemove; //read the id number of the selected seats
let seatsToShow; //variable for each selected seat
let seatsLists = []; //array for all the selected seats

async function checkSelectedSeats() {
  listOfSeats = [];
  seatsToShow = '';
  for (let salonSeat of salonSeats) { //Loop through all the seats
    await salonSeat.addEventListener('click', function () { //click function when the user clicks the seat
      if (listOfSeats.length < totalSeats && totalSeats > 0) {
        //get the id of the selected seat
        seatNum = $(this).attr('id');
        if ($(this).css("background-color") == 'rgb(1, 22, 62)') { //check the seat color
          $(this).css({ backgroundColor: "#31d7a9" });        //change the selected seat's color
          listOfSeats.push(seatNum);            //Make the seat number into HTML and show them on the webpage
          seatsToShow = `<p class="seat${seatNum}"> Row ${seatNum.charAt(0)} Chair ${seatNum.substring(1)}</p>`
          seatsLists.push(seatsToShow);
        }
      }
      if ($(this).css("background-color") == 'rgb(49, 215, 169)') { //if the user click again the same seat
        $(this).css({ backgroundColor: "#01163e" });
        seatRemove = $(this).attr('id');
        listOfSeats = listOfSeats.filter((lisOfSeat) => { return lisOfSeat !== seatRemove });
        seatHTML = `<p class="seat${seatRemove}"> Row ${seatRemove.charAt(0)} Chair ${seatRemove.substring(1)}</p>`;
        seatsLists = seatsLists.filter((seatsList) => {
          return seatsList !== seatHTML;
        });
      }
      $('.seatsNumber').html(seatsLists); //assign the seatsList into HTML page
    }); changeSeatsForTicket(listOfSeats);     //call the function
  }
}

//create a variable for reading the seats' number to the ticket
let seatsOnTicket = ' ';
function changeSeatsForTicket() {
  for (let i = 0; i < listOfSeats.length; i++) { //loop through all the selected seats and their id
    seatsOnTicket += " Row " + listOfSeats[i].charAt(0) + " Seat " + listOfSeats[i].substring(1);
  }  //store the seats number/id
}

let movieTitle = localStorage.getItem('movieTitle');
let movieDate = localStorage.getItem('date');
let freeSeats, occupiedSeats, movieSeats;

async function checkIfSeatsAreTaken() { //Loop and check the occupied seats
  let rawData = await fetch('json/ticket.json'); //This function checks the free seats and occupied seats
  currentTickets = await rawData.json();
  for (let i = 0; i < currentTickets.length; i++) {
    if (currentTickets[i].movieName == movieTitle && currentTickets[i].date == movieDate) {
      for (let j = 0; j < currentTickets[i].seatID.length; j++) {
        let takenSeat = currentTickets[i].seatID[j];
        document.getElementById(`${takenSeat}`).disabled = true;
        occupiedSeats = currentTickets[i].seatID.length;
      }
      if (rightSalon == 'Grande') {
        movieSeats = 66;
        freeSeats = movieSeats - occupiedSeats;
      }
      if (rightSalon == 'Cozy') {
        movieSeats = 48;
        freeSeats = movieSeats - occupiedSeats;
      }
    }
    if (currentTickets[i].movieName != movieTitle || currentTickets[i].date != movieDate) {
      if (rightSalon == 'Grande') {
        freeSeats = 66;
      }
      if (rightSalon == 'Cozy') {
        freeSeats = 48;
      }
    }
  }
  if (freeSeats < totalSeats) {
    alert("Unfortunately, there is no more available seats!");
  }
}