// Get index of random item from array.
function randomIndexFromArr(arr) {
  return Math.floor(Math.random()*arr.length);
} 

// Shuffle an array
function shuffle(arr) {
  return arr.sort((a, b) => 0.5 - Math.random());
}
