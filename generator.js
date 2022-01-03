/*
 
This code reads `data.js` and asks questions in there.
For logic of the generator, see `data.js`

*/

var lang = "en";
var textAnswers = {}
var changableQuestionsQueue = [];
var currentlyAsked = questions.root; // Question currently displayed on screen

els.result.addEventListener("load", event => {
  els.resultLoad.style.display = "none";
  els.result.style.display = "block";
  showButton("PANIC", processString(strings.continue), undefined, true);
});

ask(questions.root); // Ask the first question

function setLang(_lang) {
  lang = _lang;
  
  // Highlight the selected language
  Array.from(els.langPicker.children).forEach(
    el => el.classList.remove("selected")
  );
  els.lang[lang].className = "selected";
  
  // Re-ask currently asked question to apply language change immediately
  ask(currentlyAsked);
}

// Ask a random question from the array.
function askRandomOf(arr) {
  changableQuestionsQueue = changableQuestionsQueue.concat(shuffle(arr));
  panic();
};

function createMeme(data) {
  els.result.src="http://api.memegen.link/images/" + data.template + "/" + data.content.map(txt => processString(txt)).join("/") + ".png";
  
  els.resultLoad.style.display = "block";
  els.result.addEventListener("load", event => {
    els.resultLoad.style.display = "none";
    els.result.style.display = "block";
  });
}

// Show a button in options row.
function showButton(id, text, textAnswerId, accent) {
  var butt = document.createElement("button");
  butt.innerText = text;
  if (accent)
    butt.className = "accent";
  butt.onclick = function (){ 
    optClicked(id, textAnswerId); 
  };
  els.buttons.appendChild(butt);
}

// Called, when we found ourselves in dead-end
function panic() {
  if (changableQuestionsQueue.length == 0)
    ask(questions.root);
  else
    ask(questions[changableQuestionsQueue[changableQuestionsQueue.length - 1]]); // Ask the last question in changableQuestionsQueue.\
  changableQuestionsQueue.pop() // Remove the question we just asked
}

// Called, when button created by `showButton` clicked.
function optClicked(teleport, textAnswerId) {
  console.log(teleport);
  if (teleport === "PANIC") {
    panic();
    return;
  }
  if (textAnswerId !== undefined) { // The question is textual
    textAnswers[textAnswerId] = els.textfield.input.value;
  }
  askRandomOf(teleport);
}

// Convert the `text` item of questions to string
function processString(str) {
  
  var arr;
  
  switch (typeof(str)) {
    case "string": return str;              // `str` is a string literal
    case "number": return textAnswers[str]; // `str` is response to an earlier question
    case "object": 
      if (Array.isArray(str))
        arr = str;
      else                                  // `str` is translated to multiple languages
        return processString(str[lang]);  
      break;
    case "undefined": return "";
    default: console.error("Argument of processString() should not be type of " + typeof(str)); break;
  }
  
  var resultStr = "";
  arr.forEach(item => {
    resultStr += processString(item);
  });
  return resultStr;
}

// Ask a question to user. The response is gathered in `optClicked`.
function ask(question) {
  
  currentlyAsked = question;
  
  // Eventually go to random option
  if (question.type === qtype.random) {
    askRandomOf(question.options);
    return;
  }
    
  // Reset GUI
  els.iframe.outer.style.display = "none"; // Hide iframe
  els.textfield.input.style.display = "none";  // Hide textbox
  els.resultLoad.style.display = "none";
  els.result.style.display = "none";
  els.textfield.input.value = ""; // Empty textbox
  els.buttons.innerHTML = ""; // Remove buttons
  
  // Iframe
  if (question.preload) {
    els.iframe.outer.style.src = question.preload;
  }
  if (question.page) {
    els.iframe.outer.style.display = "block";
    els.iframe.inner.src = processString(question.page);
  } 
  
  if (question.type === qtype.meme) {
    els.header.innerText = processString(strings.done);
    createMeme(question);
    return;
  }
  
  // Show header
  els.header.innerText            = processString(question.text);
  els.textfield.prefix.innerText  = processString(question.textPrefix);
  els.textfield.postfix.innerText = processString(question.textPostfix);
  
  // Show buttons
  question.options.forEach(opt => {
    showButton(opt.teleport, processString(opt.text), question.textId, opt.teleport != "PANIC");
  });
  
  // Eventually show textbox
  if (question.type === qtype.text) {
    els.textfield.input.style.display = "inline";
    els.textfield.input.placeholder = processString(question.placeholder);
    lastChangableQuestion = question;
  }
}
