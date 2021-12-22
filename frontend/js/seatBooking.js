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
let selectSeatNumber; //read the id number of the selected seats
let selectedSeatsToShow; //variable for each selected seat
let seatsToShowList = []; //array for all the selected seats

async function checkSelectedSeats() {
  selectedSeatsToShow = '';
  for (let salonSeat of salonSeats) { //Loop through all the seats
    await salonSeat.addEventListener('click', function () {
      if (totalSeats == 0) {
        alert("Please choose the ticket first!");
        return;
      }                                                    //click function when the user clicks the seat
      selectSeatNumber = $(this).attr('id');                //get the id of the selected seat
      if ($(this).css("background-color") == 'rgb(1, 22, 62)') { //check the seat color
        $(this).css({ backgroundColor: "#31d7a9" });        //change the selected seat's color
        listOfSeats.push(selectSeatNumber);

        //Make the seat number into HTML and show them on the webpage
        seatsToShowList.push(selectedSeatsToShow = `
        <p class="seat${selectSeatNumber}">
       Row ${selectSeatNumber.charAt(0)} 
       Chair ${selectSeatNumber.substring(1)}</p>`); //Selected seats are in Array
      }                                              //Which makes it easier to remove it again

      if ($(this).css("background-color") == 'rgb(49, 215, 169)') { //if the user click again the same seat
        $(this).css({ backgroundColor: "#01163e" });                //change back the seat color 
        listOfSeats.pop(selectSeatNumber);               //remove selected seat from the seat array, screen
        $('.seat' + `${selectSeatNumber}`).remove();

        seatsToShowList.pop(`<p class="seat${selectSeatNumber}">    
          Row ${selectSeatNumber.charAt(0)}
          Chair ${selectSeatNumber.substring(1)}</p> `);
      }
      $('.seatsNumber').html(seatsToShowList); //assign the seatsToShowList into HTML page
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
async function checkIfSeatsAreTaken() { //Loop and check the occupied seats
  let rawData = await fetch('json/ticket.json');
  currentTickets = await rawData.json();
  for (let i = 0; i < currentTickets.length; i++) {
    if (currentTickets[i].movieName == movieTitle && currentTickets[i].date == movieDate) {
      for (let j = 0; j < currentTickets[i].seatID.length; j++) {
        let takenSeat = currentTickets[i].seatID[j];
        document.getElementById(`${takenSeat}`).disabled = true;
      }
    }
  }
}