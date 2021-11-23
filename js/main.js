$(function () {
  $("#datepicker").datepicker({ minDate: 0, maxDate: "30D" });
});

let films;
async function readFilmInformation() {
  films = await $.getJSON('movieinfo.json');
}


