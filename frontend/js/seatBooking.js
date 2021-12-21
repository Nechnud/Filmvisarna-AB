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
    await salonSeat.addEventListener('click', function () { //click function when the user clicks the seat
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

//Codes for ticket number ----------------------------------------------
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

//Jsonflex for tickets -------------------------------------------
let tickets;
async function readTickets() {
  tickets = await JSON._load('ticket');
  await ticketNumberGenerator();
}

//create a variable for reading the seats' number to the ticket
let seatsOnTicket = ' ';
function changeSeatsForTicket() {
  for (let i = 0; i < listOfSeats.length; i++) { //loop through all the selected seats and their id
    seatsOnTicket += " Row " + listOfSeats[i].charAt(0) + " Seat " + listOfSeats[i].substring(1);
  }  //store the seats number/id
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
      "salon": localStorage.getItem('salon'),
      "ticketNumber": randomTicketNumber,
      "seat": seatsOnTicket,
      "seatID": listOfSeats
    }

  } else {  //If the ticket array is not empty, check all the ticket numbers and create new rnd ticket number
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].ticketNumber == randomTicketNumber) {
        randomTicketNumber = ticketNumberGenerator();
        i = 0;

      } else {
        newTicket = {
          "movieName": localStorage.getItem('movieTitle'),
          "date": localStorage.getItem('date'),
          "salon": localStorage.getItem('salon'),
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
  if (listOfSeats.length == 0) {
    $('.modal-body').html(`
    <h4>No seats are choosen, please choose your seats!</h4>`);
  }
  if (listOfSeats.length != 0) {
    tickets.push(newTicket);
    $('.modal-body').html( //Show the ticket information on the pop-window
      `<h4>${newTicket.ticketNumber}</h4>
    <h4>${newTicket.movieName}</h4>
    <h4>${newTicket.date}</h4>
    <h4>${newTicket.salon}</h4>
    <h4>${newTicket.seat}</h4>`);
    localStorage.setItem('myTicketNumber', newTicket.ticketNumber);
    await JSON._save('ticket', tickets);
  }
}

$('#toMyBooking').on('click', function () { //Confirm button function on pop-up window
  if (listOfSeats.length == 0) { //if there is no seat are choosen by the user
    $("#linkToBooking").attr("href", "seatBooking.html");// the program stays on the seatBooking page
  }

  if (listOfSeats.length != 0) { //if there are seats are choose by the user
    $("#linkToBooking").attr("href", "myBookings.html");// this button will link the webpage to mybooking.html
  }
});

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