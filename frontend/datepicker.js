$(document).ready(function () {
  $("#datepicker").datepicker();
});

$(function () {
  $("#datepicker").datepicker({ dateFormat: "yy-mm-dd" });
  $("#datepicker").on("change", function () {
    var selected = $(this).val();
    alert(selected);
  });
});