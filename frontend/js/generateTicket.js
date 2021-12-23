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
let seatsOnTicket = [];
function changeSeatsForTicket() {
  for (let i = 0; i < listOfSeats.length; i++) { //loop through all the selected seats and their id
    seatsOnTicket.push(" Row " + listOfSeats[i].charAt(0) + " Seat " + listOfSeats[i].substring(1));
  }

  console.log(seatsOnTicket)  //store the seats number/id
}


let currentTickets;
let newTicket;
async function checkTicketNumber() {//Creates a function that allows us to check ticket number
  changeSeatsForTicket();     //call the function that check all the selected seats' number     

  if (tickets.length == 0) {                   //If tickets array is empty, proceed
    newTicket = {                              //Gets id from json file and creates an object in the tickets array
      "movieName": localStorage.getItem('movieTitle'),
      "date": localStorage.getItem('date'),
      "time": localStorage.getItem('movieTime'),
      "salon": localStorage.getItem('salon'),
      "ticketNumber": randomTicketNumber,
      "ticketAmount": totalSeats,
      "price": totalPrice,
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
          "time": localStorage.getItem('movieTime'),
          "salon": localStorage.getItem('salon'),
          "ticketNumber": randomTicketNumber,
          "ticketAmount": totalSeats,
          "price": totalPrice,
          "seat": seatsOnTicket,
          "seatID": listOfSeats
        }
      }
    }
  }
  localStorage.setItem('myTicketNumber', newTicket.ticketNumber);
  ticketPopUp();
  seatsOnTicket = [];
}

async function ticketPopUp() {
  if (listOfSeats.length == 0 && totalSeats == 0 && totalPrice == 0) {
    $('.modal-body').html(`
    <h4>Please choose the ticket and choose seats!</h4>`);
  }
  if (listOfSeats.length < totalSeats && totalSeats != 0 && totalPrice != 0) {
    $('.modal-body').html(`
    <h4>Please choose all of your seats!</h4>`);
  }
  if (listOfSeats.length == totalSeats && totalSeats != 0 && totalPrice != 0) {
    $('.modal-body').html( //Show the ticket information on the pop-window
      `<h4>${newTicket.ticketNumber}</h4>
    <h4>${newTicket.movieName}</h4>
    <h4>${newTicket.date}</h4>
    <h4>${newTicket.time}</h4>
    <h4>${newTicket.salon}</h4>
    <h4>${newTicket.seat}</h4>
    <h4>Price: ${totalPrice}</h4>
    <h4>Tickets: ${totalSeats}</h4>
    `);
    addTicket();
  }
}

$('#cancel').click(function () {
  if (listOfSeats.length != 0) {
    cancelBooking();
  }
});

async function cancelBooking() {// Creates method addTicket that pushes the object / ticket item into the json file 
  tickets.pop(newTicket);
  await JSON._save('ticket', tickets);
}

async function addTicket() {// Creates method addTicket that pushes the object / ticket item into the json file 
  tickets.push(newTicket);
  await JSON._save('ticket', tickets);
}

$('#toMyBooking').on('click', function (event) { //Confirm button function on pop-up window
  if (listOfSeats.length == 0 && totalSeats == 0) { //if there is no seat are choosen by the user
    event.preventDefault();// the program stays on the seatBooking page
  }
  if (listOfSeats.length < totalSeats && totalSeats != 0) {
    event.preventDefault();
  }
  if (listOfSeats.length != 0) {//if there are seats are choose by the user
    $("#linkToBooking").attr("href", "myBookings.html");// this button will link the webpage to mybooking.html
  }
});

