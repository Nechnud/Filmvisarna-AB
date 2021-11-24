$('.datepicker').datepicker({
  format: "dd/mm/yyyy",
  weekStart: 1,
  startDate: "+0d",
  endDate: "+30d",
  todayHighlight: true
});

let films;
async function readFilmInformation() {
  films = await $.getJSON('showing.json');
}


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes()
var dateTime = date + ' ' + time;


$(datepicker).click(function (e) { 
  e.preventDefault();
  
});