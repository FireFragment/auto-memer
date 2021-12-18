const lang = "en";

// Some DOM elements we will use
const els = {
  header: document.getElementById("q-header"),
  buttons: document.getElementById("q-button-row"),
  result: document.getElementById("result"),
  resultLoad: document.getElementById("memeLoading"),
  textfield: {
    input: document.getElementById("q-input"),
    prefix: document.getElementById("q-prefix"),
    postfix: document.getElementById("q-postfix"),
  }
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
