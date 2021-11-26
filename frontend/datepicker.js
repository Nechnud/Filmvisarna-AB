$(document).ready(function () {
  $("#datepicker").datepicker({
    weekStart: 1,
    startDate: "+0d",
    endDate: "+30d",
    todayHighlight: true
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