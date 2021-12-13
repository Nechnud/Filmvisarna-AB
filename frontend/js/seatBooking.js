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
      if ($(this).css("background-color") == 'rgb(49, 215, 169)')
        $(this).css({ backgroundColor: "#01163e" });
    })
  }

  console.log(salongSeats);
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
async function readTickets() {
  tickets = await JSON._load('ticket');
  await ticketNumberGenerator();
  // await removePerson();
}

async function checkTicketNumber() {
  let newTicket;
  if (tickets.length == 0) {
    newTicket = {
      "movieName": localStorage.getItem('movieTitle'),
      "date": localStorage.getItem('date'),
      "salong": localStorage.getItem('salong'),
      "ticketNumber": randomTicketNumber
    }

  } else {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].ticketNumber == randomTicketNumber) {
        randomTicketNumber = ticketNumberGenerator();
        i = 0;

      } else {
        newTicket = {
          "movieName": localStorage.getItem('movieTitle'),
          "date": localStorage.getItem('date'),
          "salong": localStorage.getItem('salong'),
          "ticketNumber": randomTicketNumber
        }
      }
    }
  }
  addTicket(newTicket);
}

async function addTicket(newTicket) {
  tickets.push(newTicket);
  await JSON._save('ticket', tickets);
  console.log(tickets);
}
readTickets();