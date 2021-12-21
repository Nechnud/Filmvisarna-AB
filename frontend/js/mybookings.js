let myTickets;
let ticketData;
let thisTicketNumber = localStorage.getItem("myTicketNumber"); //Get the ticketnumber from localStorage
async function readTicketJson() { // Read the ticket.json to myTickets
    let rawData = await fetch('json/ticket.json');
    myTickets = await rawData.json();
    checkTicketData();
}

function checkTicketData() { //This function changes the background-color of the ticketsinfo div
    if (thisTicketNumber == ' ') {
        ticketData = '';
        document.getElementById("ticketsinfo").innerHTML = ticketData;
        $("#ticketsinfo").css('background-color', 'rgba(0, 0, 0, 0)');
    }
    else {
        $("#ticketsinfo").css('background-color', 'rgba(0, 0, 0, 0.5)');
        renderTicketInfo();

    }
}

function renderTicketInfo() { //Shows the newly booked ticket to the user
    for (let i = 0; i < myTickets.length; i++) {

        if (thisTicketNumber === myTickets[i].ticketNumber) {
            ticketData = `
            <p>MY TICKET: </p>
            <p>Movie: ${myTickets[i].movieName}</p>
            <p>Date: ${myTickets[i].date}</p>
            <p>Salon: ${myTickets[i].salon}</p>
            <p>Seat: ${myTickets[i].seat}</p>
            <p>Ticket Number: ${myTickets[i].ticketNumber}</p>
            `;
        }
    }
    $("#ticketsinfo").css('background-color', 'rgba(0, 0, 0, 0.5)'); //Change background color
    document.getElementById("ticketsinfo").innerHTML = ticketData;

}


let ticketNumberToCheck;
document.getElementById('search').addEventListener("click", (event) => { //Click event for button "search"
    ticketData = '';
    ticketNumberToCheck = document.getElementById('ticketNumber').value;
    //myTickets.some()/Array.som() is a method in JavaScript for array , here is a arraw function which returns a boolean value
    let ticketNumRight = myTickets.some(({ ticketNumber }) => ticketNumber === ticketNumberToCheck);
    if (ticketNumRight == true) {                    //ticketNumRight returns a boolean value
        for (let i = 0; i < myTickets.length; i++) { //Loop through the tickets
            if (ticketNumberToCheck === myTickets[i].ticketNumber) {//Write out when ticket is found
                ticketData = `
            <h5>MY TICKET: </h5>
            <h5>Movie: ${myTickets[i].movieName}</h5>
            <h5>Date: ${myTickets[i].date}</h5>
            <h5>Salon: ${myTickets[i].salon}</h5>
            <h5>Seat: ${myTickets[i].seat}</h5>
            <h5>Ticket Number: ${myTickets[i].ticketNumber}</h5>
            <button class="btn" type="button" id="cancelTicket">Cancel Ticket</button>
            `;
            }
        }
    } //If the ticket number does match, it shows a message to the user
    if (ticketNumRight == false && ticketNumberToCheck != ' ') {
        ticketData = `
        <h5>Tickets Not Found 😢</h5> 
        `;
    }
    document.getElementById("ticketsinfo").innerHTML = ticketData;
    $("#ticketsinfo").css('background-color', 'rgba(0, 0, 0, 0.5)'); //Change the background color
    if (ticketNumRight == true) { cancelTicket(); } //If there is ticket found, addEventListener to cancel button
});

// Codes for cancel button ---------------------------------------------------
function cancelTicket() {
    document.getElementById('cancelTicket').addEventListener("click", (event) => {
        if (confirm("Click \"ok\" to cancel the ticket") == true) { //Confirm window
            ticketFromJson(); //Call the function
        }
    });
}

// Codes for cancel tickets ------------------------------------------------
let tickets;
async function ticketFromJson() {
    tickets = await JSON._load('ticket');
    let ticketToRemove = document.getElementById('ticketNumber').value;
    console.log(ticketToRemove);
    tickets = tickets.filter(function (ticket) {
        return ticket.ticketNumber !== ticketToRemove;
    });
    await JSON._save('ticket', tickets);
    messageToCancel();
}
//--------------------------------------------------------------------------

//This function shows message to the user when the ticket is cancelled------
function messageToCancel() {
    let html = "Your tickets are cancelled!";
    document.getElementById("ticketsinfo").innerHTML = html;
}
//--------------------------------------------------------------------------
readTicketJson();
localStorage.setItem('myTicketNumber', ' ');


