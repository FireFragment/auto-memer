var textAnswers = {}
var changableQuestionsQueue = [];

ask(questions.root); // Ask the first question

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
  console.log(changableQuestionsQueue);
  console.log(changableQuestionsQueue[changableQuestionsQueue.length - 1]);
  console.log(questions[changableQuestionsQueue[changableQuestionsQueue.length - 1]]);
  ask(questions[changableQuestionsQueue[changableQuestionsQueue.length - 1]]); // Ask the last question in changableQuestionsQueue.\
  changableQuestionsQueue.pop() // Remove the question we just asked
}

// Called, when button created by `showButton` clicked.
function optClicked(teleport, textAnswerId) {
  if (teleport === "PANIC") {
    panic();
    return;
  }
  if (textAnswerId !== undefined) {
    textAnswers[textAnswerId] = els.input.value;
  }
  ask(questions[teleport]);
}

// Convert the `text` item of questions to string
function processArrString(arr) {
  var resultStr = "";
  arr.forEach(item => {
    resultStr += processStringUnit(item);
  });
  return resultStr;
}

function processStringUnit(str) {
  if (typeof(str) === "number") { // `str` is response to an earlier question
    return textAnswers[str];
  }
  else // `str` is string
    return str;
}

// Ask a question to user. The response is gathered in `optClicked`.
function ask(question) {
  // Eventually go to random option
  if (question.type === qtype.random) {
    // We already tried all options and user's respones weren't good for making a meme
    changableQuestionsQueue = changableQuestionsQueue.concat(shuffle(question.options));
    console.log(shuffle(question.options));
    console.log(changableQuestionsQueue);
    panic();
    return;
  }
  
  if (question.type === qtype.meme) {
    createMeme(question);
    return;
  }
    
  // Reset GUI
  els.input.style.display = "none"; // Hide textbox
  els.buttons.innerHTML = ""; // Remove buttons
  
  // Show header
  els.header.innerText = processArrString(question.text);
  
  // Show buttons
  if (question.type !== qtype.random)
    question.options.forEach(opt => {
      showButton(opt.teleport, opt.text, question.textId);
    });
  
  // Eventually show textbox
  if (question.type === qtype.text) {
    els.input.style.display = "inline";
    lastChangableQuestion = question;
    changableQuestionsQueue.push(question.name);
  }
}
