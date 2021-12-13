var textAnswers = {}
var changableQuestionsQueue = [];

ask(questions.root); // Ask the first question

// Ask a random question from the array.
function askRandomOf(arr) {
  changableQuestionsQueue = changableQuestionsQueue.concat(shuffle(arr));
  panic();
};

function createMeme(data) {
  els.result.src="http://api.memegen.link/images/" + data.template + "/" + data.content.map(txt => textAnswers[txt]).join("/") + ".png";
}

// Show a button in options row.
function showButton(id, text, textAnswerId) {
  var butt = document.createElement("button");
  butt.innerText = text;
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
    textAnswers[textAnswerId] = els.input.value;
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
    default: console.error("str should not be type of " + typeof(str)); break;
  }
  
  var resultStr = "";
  arr.forEach(item => {
    resultStr += processString(item);
  });
  return resultStr;
}

// Ask a question to user. The response is gathered in `optClicked`.
function ask(question) {
  // Eventually go to random option
  if (question.type === qtype.random) {
    // We already tried all options and user's respones weren't good for making a meme
    askRandomOf(question.options);
    return;
  }
  
  if (question.type === qtype.meme) {
    createMeme(question);
    return;
  }
    
  // Reset GUI
  els.input.style.display = "none"; // Hide textbox
  els.input.value = ""; // Empty textbox
  els.buttons.innerHTML = ""; // Remove buttons
  
  // Show header
  els.header.innerText = processString(question.text);
  
  // Show buttons
  if (question.type !== qtype.random)
    question.options.forEach(opt => {
      showButton(opt.teleport, processString(opt.text), question.textId);
    });
  
  // Eventually show textbox
  if (question.type === qtype.text) {
    els.input.style.display = "inline";
    lastChangableQuestion = question;
  }
}
