
//Codes for showing the movie information when the user click on the movie poster ---------
let movieID;
//Get the id of the movie when the user clicks the movie poster on the homepage
$('.movie').click(function () {
  //Get the id of the clicked html tag
  movieID = $(this).attr('id');
});

//Antonio: the function above works fine when I click on the movies on homepage
//but I still have no idea how should we send the movieID to filminfo.js




