// Get index of random item from array.
function randomIndexFromArr(arr) {
  return Math.floor(Math.random()*arr.length);
} 

// Get rantom item from array
function randomFromArr(arr) {
  return arr[randomIndexFromArr(arr)];
} 

// Shuffle an array
function shuffle(arr) {
  return arr.sort((a, b) => 0.5 - Math.random());
}
