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
      <button class="seat" id="${idForSeat}"></button>
      `;
    }

    //here add a div close tag for the row that we got in the first loop
    seats += `</div>`;

    if (seats !== undefined) {
      document.getElementById("rowForSeats").innerHTML = seats;
    }
  }
  salongSeats = document.querySelectorAll(".seat");
  checkIfSeatsAreTaken();
  checkSelectedSeats(salongSeats);

}
readMovieHall();

//Create two variables
let listOfSeats = []; //this array stores the selected seats
let selectSeatNumber; //read the id number of the selected seats
let selectedSeatsToShow; //variable for each selected seat
let seatsToShowList = []; //array for all the selected seats


async function checkSelectedSeats() {
  selectedSeatsToShow = '';
  listOfSeats = [];
  for (let salongSeat of salongSeats) { //Loop throuh all the seats
    await salongSeat.addEventListener('click', function () { //click function when the user clicks the seat
      selectSeatNumber = $(this).attr('id'); //get the id of the selected seat
      if ($(this).css("background-color") == 'rgb(1, 22, 62)') { //check the seat color
        $(this).css({ backgroundColor: "#31d7a9" }); //change the selected seat's number
        listOfSeats.push(selectSeatNumber);
        //Make the seat number into HTML and show them on the webpage
        seatsToShowList.push(selectedSeatsToShow = `
        <p class="seat${selectSeatNumber}">
       Row ${selectSeatNumber.charAt(0)} 
       Chair ${selectSeatNumber.substring(1)}</p>`);
      }

      if ($(this).css("background-color") == 'rgb(49, 215, 169)') { //if the user click again the same seat
        $(this).css({ backgroundColor: "#01163e" }); //change the seat color 
        listOfSeats.pop(selectSeatNumber); //remove the selected seat from the seat array, screen
        $('.seat' + `${selectSeatNumber}`).remove();
        //Make the seat number into HTML and show them on the webpage
        seatsToShowList.pop(`<p class="seat${selectSeatNumber}">    
          Row ${selectSeatNumber.charAt(0)}
          Chair ${selectSeatNumber.substring(1)}</p> `);
      }
      $('.seatsNumber').html(seatsToShowList); //assign the seatsToShowList into HTML page
    }); changeSeatsForTicket(listOfSeats); //call the function
  }
}

//Jsonflex code for ticket-----------------------------------------
let randomTicketNumber;

// Generates a random ticket number using the ASCII-code. The numbers used range from 48 to 57 (equivalent to "0" to "9") and  // from 65 to 90 (equivalent to "A" to "Z" in upper case).
async function ticketNumberGenerator() {
  let arrayOfCharacters = [];
  while (arrayOfCharacters.length < 10) {
    let randomASCII = Math.floor(Math.random() * (90 - 48) + 48); // Generates a random integer between 48 and 90;
    // We do not want to use the characters between 58 and 64 (they are neither numbers nor letters)
    if (randomASCII < 58 || randomASCII > 64) {
      let stringFromASCII = String.fromCharCode(randomASCII); // We obtain the characters using their values in ASCII-code.
      arrayOfCharacters.push(stringFromASCII); // We save the characters to an array until we have 10.
    }
  }
  randomTicketNumber = arrayOfCharacters.join(''); // We join the 10 characters to get our ticket number.
  checkTicketNumber(randomTicketNumber);
}

let tickets;
//Jsonflex for tickets -------------------------------------------
async function readTickets() {
  tickets = await JSON._load('ticket');
  await ticketNumberGenerator();
}
//create a variable for reading the seats' number to the ticket
let seatsOnTicket = ' ';

function changeSeatsForTicket() {
  for (let i = 0; i < listOfSeats.length; i++) { //loop through all the selected seats and their id
    seatsOnTicket += " Row " + listOfSeats[i].charAt(0) + " Seat " + listOfSeats[i].substring(1); //store the seats nummber/id

  }
}

let currentTickets;
let movieTitle = localStorage.getItem('movieTitle');
let movieDate = localStorage.getItem('date');

async function checkTicketNumber() {//Creates a function that allows us to check ticket number
  changeSeatsForTicket();     //call the function that check all the selected seats' number     
  let newTicket;                               //Declare variable new ticket
  if (tickets.length == 0) {                   //If tickets array is empty, proceed
    newTicket = {                              //Gets id from json file and creates an object in the tickets array
      "movieName": localStorage.getItem('movieTitle'),
      "date": localStorage.getItem('date'),
      "salong": localStorage.getItem('salong'),
      "ticketNumber": randomTicketNumber,
      "seat": seatsOnTicket,
      "seatID": listOfSeats
    }

  } else {                                      //If the ticket array is not empty, check all the ticket numbers and create new rnd ticket number
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].ticketNumber == randomTicketNumber) {
        randomTicketNumber = ticketNumberGenerator();
        i = 0;

      } else {
        newTicket = {
          "movieName": localStorage.getItem('movieTitle'),
          "date": localStorage.getItem('date'),
          "salong": localStorage.getItem('salong'),
          "ticketNumber": randomTicketNumber,
          "seat": seatsOnTicket,
          "seatID": listOfSeats
        }
      }
    }
  }
  addTicket(newTicket);
}

async function addTicket(newTicket) {//Creates method addTicket that pushes the object/ticket item into the json file
  tickets.push(newTicket);
  localStorage.setItem('myTicketNumber', newTicket.ticketNumber);
  await JSON._save('ticket', tickets);

}
//Function for button "Book" on seatBooking.html
$('#book').on('click', function () {
  console.log(listOfSeats);
  if (listOfSeats.length == 0) { //if there is no seat are choosen by the user
    alert("Please choose your seats!"); // the program will alert the user to choose seats
    $("#linkToBooking").attr("href", "seatBooking.html");
  }
  if (listOfSeats.length != 0) { //if there are seats are choose by the user
    alert("Your tickets are ready!"); // this button will link the webpage to mybooking.html
    $("#linkToBooking").attr("href", "myBookings.html");
  }
});

async function checkIfSeatsAreTaken() {
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