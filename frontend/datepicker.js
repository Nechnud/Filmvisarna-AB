
//Date picker Jquery
$(document).ready(function () {
  $("#datepicker").datepicker({
<<<<<<< HEAD
    //maximum 30days 
    maxDate: "+1m",
    //Start date is always today, new Date() is current date object
    minDate: new Date(),
=======
    weekStart: 1,
    startDate: "+0d",
    endDate: "+30d",
    todayHighlight: true
>>>>>>> 10be2781a4251bb36a0fb05d8db7809a10d78125
  });
});

$(function () {
  $("#datepicker").datepicker({
    format: "dd/mm/yyyy",

  });
  $("#datepicker").on("change", function () {
    let date = $(this).val();
    alert(date);
  });
});