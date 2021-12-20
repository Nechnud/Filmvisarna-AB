let myTickets;
let ticketData;
let thisTicketNumber = localStorage.getItem("myTicketNumber");
console.log(localStorage.getItem("myTicketNumber"));
async function readTicketJson() {
    let rawData = await fetch('json/ticket.json');
    myTickets = await rawData.json();
    checkTicketData();
}



function checkTicketData() {
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

let ticketNumberToCheck;

document.getElementById('searchTicket').addEventListener("click", (event) => {
    ticketNumberToCheck = document.getElementById('ticketNumber').value;
    thisTicketNumber = ticketNumberToCheck;
    renderTicketInfo();
});

function renderTicketInfo() {


    for (let i = 0; i < myTickets.length; i++) {

        if (thisTicketNumber === myTickets[i].ticketNumber) {
            ticketData = `
            <p>MY TICKET: </p>
            <p>Movie: ${myTickets[i].movieName}</p>
            <p>Date: ${myTickets[i].date}</p>
            <p>Salon: ${myTickets[i].salong}</p>
            <p>Seat: ${myTickets[i].seat}</p>
            <p>Ticket Number: ${myTickets[i].ticketNumber}</p>
            <button class="btn" type="button" id="cancelTicket">Cancel Ticket</button>
            `;
        }

    }
    $("#ticketsinfo").css('background-color', 'rgba(0, 0, 0, 0.5)');
    document.getElementById("ticketsinfo").innerHTML = ticketData;
    cancelTicket();
}

function cancelTicket() {
    document.getElementById('cancelTicket').addEventListener("click", (event) => {

        if (confirm("Click \"yes\" to cancel the ticket") == true) {

        }
        ticketNumberToCheck = document.getElementById('ticketNumber').value;
        thisTicketNumber = ticketNumberToCheck;
        renderTicketInfo();
    });
}





readTicketJson();
localStorage.setItem('myTicketNumber', ' ');


