
//Date picker Jquery
$(document).ready(function () {
  $("#datepicker").datepicker({
    //maximum 30days 
    maxDate: "+1m",
    //Start date is always today, new Date() is current date object
    minDate: new Date(),
    dateFormat: "dd-mm-yy"
  });
});

$(function () {
  $("#datepicker").on("change", function () {
    let date = $(this).val();
    alert(date);
  });
});