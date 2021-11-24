// A global variable to store all data in
let data = {};

async function readJSON() {
  // Read json and put in the data variable
  for (let type of ['movieinfo', 'shows', 'moviehalls', 'bookings']) {
    data[type] = await JSON._load(type + '.json');
  }
  // Run start function 
  start();
}

// A helper to find things by id (films, shows etc.)
function findById(type, id) {
  return data[type].find(x => x.id === id);
}

async function start() {
  console.log(findById('moviehalls', Grande));
  console.log(await book(1, [30, 80, 81]));
  console.log(freeSeats(1));
}

async function start() {
  console.log(findById('moviehalls', Cozy));
  console.log(await book(1, [59, 58, 60]));
  console.log(freeSeats(1));
}
readJSON();