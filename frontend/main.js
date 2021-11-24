$('.datepicker').datepicker({
  format: "dd/mm/yyyy",
  weekStart: 1,
  startDate: "+0d",
  endDate: "+30d",
  todayHighlight: true
});

let films;
async function readFilmInformation() {
  films = await $.getJSON('movieinfo.json');
}


