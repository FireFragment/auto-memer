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
  },
  langPicker: document.getElementById("lang-picker"),
  lang: {
    en: document.getElementById("lang-en"),
    cs: document.getElementById("lang-cs")
  },
  iframe: {
    inner: document.getElementById("iframe"),
    outer: document.getElementById("iframe-outer")
  },
  grayWarning: document.getElementById("gray-warning")
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
  },
  continue: {
    "en": "Generate next meme",
    "cs": "Vygenerovat další meme"
  },
  grayWarning: {
    "en": "<b>Warning: </b>If you press some of gray buttons, you will be returned back and the meme generation will take longer time!",
    "cs": "<b>Varování: </b>Pokud stisknete některé z šedých tlačítek, budete vráceni zpět a generace potrvá déle!"
  }
}
