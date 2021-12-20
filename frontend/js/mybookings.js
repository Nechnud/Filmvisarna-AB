let myTickets;
let ticketData;
let thisTicketNumber = localStorage.getItem("myTicketNumber");
async function readTicketJson() {
    let rawData = await fetch('json/ticket.json');
    myTickets = await rawData.json();
    renderTicketInfo();
}

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
    `;
        } console.log(ticketData);
    }

    document.getElementById("ticketsinfo").innerHTML = ticketData;
}
readTicketJson();
async function readTicket(){
    let theTicket = await fetch('json/ticket.json');
    theTicketfound = await theTicket.json();
    findMyTicket(theTicketfound);
}
function findMyTicket(){
    for (let i = 0; i < myTickets.length; i++) {
        if (ticket === myTickets[i].ticketNumber) {
            return  `
            <p>MY TICKET: </p>
    <p>Movie: ${myTickets[i].movieName}</p>
    <p>Date: ${myTickets[i].date}</p>
    <p>Salon: ${myTickets[i].salong}</p>
    <p>Seat: ${myTickets[i].seat}</p>
    <p>Ticket Number: ${myTickets[i].ticketNumber}</p>
    `;
    document.getElementById("searchTicket").innerHTML = ticketData;
}
