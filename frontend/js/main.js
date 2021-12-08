
//Codes for showing the movie information when the user click on the movie poster ---------
let movieID;
//Get the id of the movie when the user clicks the movie poster on the homepage

$('.movie').on('click', function () {
  //Get the id of the clicked html tag
  movieID = $(this).attr('id');
  //Store the movie id to localStorage so that when we change the webpage 
  //we could still get the movie id from localStorage
  localStorage.setItem('ID', movieID);
  //Call the function readShowJson(movieID)
  //This function is in 'screening.js' file
  readShowJson(movieID);
});




