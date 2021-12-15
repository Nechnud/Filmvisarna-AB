let myTickets;
let ticketData;
let thisTicketNumber = localStorage.getItem("myTicketNumber");
async function readTicketJson (){
    let rawData = await fetch('json/ticket.json');
    myTickets = await rawData.json()
}

function renderTicketInfo(){
    for(let i = 0; i< myTickets.lenght; i++){
 if (thisTicketNumber == myTickets[i].ticketNumber){
    ticketData = `
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