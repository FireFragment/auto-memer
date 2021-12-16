const lang = "en";

// Some DOM elements we will use
const els = {
  header: document.getElementById("q-header"),
  buttons: document.getElementById("q-button-row"),
  input: document.getElementById("q-input"),
  result: document.getElementById("result"),
  resultLoad: document.getElementById("memeLoading")
}

// Types of questions
const qtype = {
  choice: 0,
  text: 1,
  random: 2,
  meme: 3
}

const strings = {
  done: {
    "en": "You're done!",
    "cs": "Hotovo!"
  }
}
