// IDs of answers to text questions
const textAnswersIds = {
  badEvent: 0,
  badEventResolution: 1,
  badEventResolutionWrong: 2
} 

// The question flow.
const questions = {
  root: { // The flow begins with `root`.
    name: "root",
    text: ["What don't you like to happen?"],
    type: qtype.text,
    textId: textAnswersIds.badEvent,
    options: [
      {
        text: "OK",
        teleport: "badEventResolution"
      }
    ]
  },  
  badEventResolution: { 
    name: "badEventResolution",
    type: qtype.random,
    options: [
      "possibleToCancel",
      "notSoBad"
    ]
  },  
  possibleToCancel: { 
    name: "possibleToCancel",
    text: ["Can be ", textAnswersIds.badEvent, " somehow cancelled?"],
    type: qtype.choice,
    options: [
      {
        text: "Yes",
        teleport: "howToCancel"
      },
      {
        text: "No",
        teleport: "PANIC"
      },
    ]
  },   
  howToCancel: { 
    name: "howToCancel",
    text: ["How can be ", textAnswersIds.badEvent, " cancelled?"],
    type: qtype.text,
    textId: textAnswersIds.badEventResolution,
    options: [
      {
        text: "OK",
        teleport: "badEventResolutionAgainstYou"
      }
    ]
  },  
  notSoBad: { 
    name: "notSoBad",
    text: ["May it turn out in the end, that ", textAnswersIds.badEvent, " isn't so bad, as it seemed at first glance?"],
    type: qtype.choice,
    options: [
      {
        text: "Yes",
        teleport: "howNotSoBad"
      },
      {
        text: "No",
        teleport: "PANIC"
      },
    ]
  },  
  howNotSoBad: { 
    name: "howNotSoBad",
    text: ["How could be ", textAnswersIds.badEvent, " not so bad, as it seemed at first glance?"],
    type: qtype.text,
    textId: textAnswersIds.badEventResolution,
    options: [
      {
        text: "OK",
        teleport: "badEventResolutionAgainstYou"
      }
    ]
  },
  badEventResolutionAgainstYou: { 
    name: "badEventResolutionAgainstYou",
    text: ["Can the fact, that ", textAnswersIds.badEventResolution, " turn against you?"],
    type: qtype.choice,
    options: [
      {
        text: "Yes",
        teleport: "howBadEventResolutionAgainstYou"
      },
      {
        text: "No",
        teleport: "PANIC"
      }
    ]
  },
  howBadEventResolutionAgainstYou: { 
    name: "howBadEventResolutionAgainstYou",
    text: ["How can the fact, that ", textAnswersIds.badEventResolution, " turn against you?"],
    type: qtype.text,
    textId: textAnswersIds.badEventResolutionWrong,
    options: [
      {
        text: "OK",
        teleport: "panikKalmPanik"
      }
    ]
  },
  panikKalmPanik: { 
    name: "panikKalmPanik",
    type: qtype.meme,
    template: "panik-kalm-panik",
    content: [
      textAnswersIds.badEvent,
      textAnswersIds.badEventResolution,
      textAnswersIds.badEventResolutionWrong
    ]
  }
}
