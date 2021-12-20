let myTickets;
let ticketData;
let thisTicketNumber = localStorage.getItem("myTicketNumber");

async function readTicketJson() {
    let rawData = await fetch('json/ticket.json');
    myTickets = await rawData.json();
    renderTicketInfo();
}



function checkTicketData() {
    if (ticketData == undefined) {
        ticketData = '';
        document.getElementById("ticketsinfo").innerHTML = ticketData;
        document.getElementById("ticketsinfo").style.backgroundColor = rgba(0, 0, 0, 0);
    }
    else {
        document.getElementById("ticketsinfo").style.backgroundColor = rgba(0, 0, 0, 0.5);

    }
}
function renderTicketInfo() {
    checkTicketData();
    for (let i = 0; i < myTickets.length; i++) {
        if (thisTicketNumber === myTickets[i].ticketNumber) {
            ticketData = `
    <p>MY TICKET: </p>
    <p>Movie: ${myTickets[i].movieName}</p>
    <p>Date: ${myTickets[i].date}</p>
    <p>Salon: ${myTickets[i].salong}</p>
    <p>Seat: ${myTickets[i].seat}</p>
    <p>Ticket Number: ${myTickets[i].ticketNumber}</p>
    `;
        }
    }

    document.getElementById("ticketsinfo").innerHTML = ticketData;
}

readTicketJson();
localStorage.setItem('myTicketNumber', ' ');
