$(document).ready(function () {
  $("#datepicker").datepicker();
});

$(function () {
  $("#datepicker").datepicker({ dateFormat: "yy-mm-dd" });
  $("#datepicker").on("change", function () {
    let date = $(this).val();
    alert(date);
  });
});