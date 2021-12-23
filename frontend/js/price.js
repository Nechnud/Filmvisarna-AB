const childPrice = 3.5;
const adultPrice = 8.5;
const pensionerPrice = 7.5;

let childTickets = 0;
let adultTickets = 0;
let pensionerTickets = 0;

let childTotalPrice = 0;
let adultTotalPrice = 0;
let pensionerTotalPrice = 0;
let totalSeats = 0;
let totalPrice = 0;

let moviesForRating;
let movieRating;


async function readRatingFromJson() {
  let rawData = await fetch('json/movieinfo.json');
  moviesForRating = await rawData.json();
  checkMovieRating();
}

function checkMovieRating() {
  for (let i = 0; i < moviesForRating.length; i++) {
    if (moviesForRating[i].id == localStorage.getItem('ID')) {
      movieRating = moviesForRating[i].rated;
    }
  }
  if (movieRating == "R") {
    alert('This movie\'s age limit is 17!');
  }

  if (movieRating == "PG-13") {
    alert('This movie\'s age limit is 13!');
  }

}

function chooseTicketAmount() {


  let buttons = document.querySelectorAll('.amount');

  for (let button of buttons) {

    button.addEventListener('click', function (event) {
      let className = $(this).attr('class')


      if (className == "amount rounded-circle child-price-Minus") {
        if (childTickets > 0) {
          childTickets--;
          childTotalPrice = childTickets * childPrice;
          document.getElementById('counterReplaceChild').innerHTML = childTickets;
        }
      }


      if (className == "amount rounded-circle child-price-Plus") {
        childTickets++;
        childTotalPrice = childTickets * childPrice;
        document.getElementById('counterReplaceChild').innerHTML = childTickets;

      }

      if (className == "amount rounded-circle adult-price-Minus") {
        if (adultTickets > 0) {
          adultTickets--;
          adultTotalPrice = adultTickets * adultPrice;
          document.getElementById('counterReplaceAdult').innerHTML = adultTickets;
        }

      }

      if (className == "amount rounded-circle adult-price-Plus") {
        adultTickets++;
        adultTotalPrice = adultTickets * adultPrice;
        document.getElementById('counterReplaceAdult').innerHTML = adultTickets;
      }

      if (className == "amount rounded-circle pensioner-price-Minus") {
        if (pensionerTickets > 0) {
          pensionerTickets--;
          pensionerTotalPrice = pensionerTickets * pensionerPrice;
          document.getElementById('counterReplacePensioner').innerHTML = pensionerTickets;
        }
      }


      if (className == "amount rounded-circle pensioner-price-Plus") {
        pensionerTickets++;
        pensionerTotalPrice = pensionerTickets * pensionerPrice;
        document.getElementById('counterReplacePensioner').innerHTML = pensionerTickets;
      }

      totalSeats = childTickets + adultTickets + pensionerTickets;
      totalPrice = (childTotalPrice + adultTotalPrice + pensionerTotalPrice).toFixed(2);
      document.getElementById('count').innerHTML = totalSeats;
      document.getElementById('amountReplace').innerHTML = " $" + totalPrice;


    });

  }


}

chooseTicketAmount();
readRatingFromJson();



