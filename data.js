// IDs of answers to text questions
const textAnswersIds = {
  badEvent: 0,
  badEventResolution: 1,
  badEventResolutionWrong: 2,
  
  human: 3,
  badProp: 4,
  whoIsBad: 5,
  
  misconception: 6,
  whoSpreadsChaos: 7,
  whoKnowsTruth: 8
} 

// Returns options for Yes/No questions
function YesNoOpts(tpYes, tpNo) {
  if (tpNo === undefined)
    tpNo = "PANIC"
  return [    
    {
      text: {
        "en": "Yes",
        "cs": "Ano"
      },
      teleport: tpYes,
      primary: true
    },
    {
      text: {
        "en": "No",
        "cs": "Ne"
      },
      teleport: tpNo
    }
  ];
}

// Returns options for text questions
function TextOpts(teleport) {
  return [    
    {
      text: "OK",
      teleport: teleport,
      primary: true
    },
    {
      text: {
        "en": "No idea",
        "cs": "Nic mě nenapadá"
      },
      teleport: "PANIC"
    }
  ];
}

// The question flow.
const questions = {
  root: { // The flow begins with `root`.
    name: "root",
    type: qtype.random,
    options: ["badEvent", "human", "misconception"]
  },
  
  // ------- PANIK-KALM-PANIK MEME -------
  
  badEvent: {
    name: "badEvent",
    text: {
      "en": "What don't you like to happen?",
      "cs": "Co nemáš rád, když se stane?"
    },
    type: qtype.text,
    textPrefix: {
      "en": "I don't like, when",
      "cs": "Nemám rád, když"
    },
    textId: textAnswersIds.badEvent,
    options: [
      {
        text: "OK",
        teleport: ["possibleToCancel", "notSoBad"]
      }
    ]
  },
  possibleToCancel: { 
    name: "possibleToCancel",
    text: {
      "cs": ["Může být ", textAnswersIds.badEvent, " nějak zrušeno?"],
      "en": ["Can be ", textAnswersIds.badEvent, " somehow cancelled?"]
    },
    type: qtype.choice,
    options: [
      {
        text: {
          "en": "Yes",
          "cs": "Ano"
        },
        teleport: ["howToCancel"],
        primary: true
      },
      {
        text: {
          "en": "No",
          "cs": "Ne"
        },
        teleport: "PANIC"
      },
    ]
  },   
  howToCancel: { 
    name: "howToCancel",
    text: {
      "en": ["How can be ", textAnswersIds.badEvent, " cancelled?"],
      "cs": ["Jak může být ", textAnswersIds.badEvent, " zrušeno?"],
    },
    type: qtype.text,
    textId: textAnswersIds.badEventResolution,
    options: [
      {
        text: "OK",
        teleport: ["badEventResolutionAgainstYou"]
      }
    ]
  },  
  notSoBad: { 
    name: "notSoBad",
    text: {
      "en": ["May it turn out in the end, that ", textAnswersIds.badEvent, " isn't so bad, as it seemed at first glance?"],
      "cs": ["Může se nakonec ukázat, že ", textAnswersIds.badEvent, " není tak špatné, jak vypadalo na první pohled?"],
    },
    type: qtype.choice,
    options: YesNoOpts(["howNotSoBad"])
  },  
  howNotSoBad: { 
    name: "howNotSoBad",
    text: {
      "en": ["How could be ", textAnswersIds.badEvent, " not so bad, as it seemed at first glance?"],
      "cs": ["Jak může ", textAnswersIds.badEvent, " nebýt tak špatné, jak vypadalo na první pohled?"]
    },
    type: qtype.text,
    textPrefix: {
      "en": [textAnswersIds.badEvent, " isn't so bad, as it seemed at first glance, when "],
      "cs": [textAnswersIds.badEvent, " není tak špatné, jak vypadalo na první pohled, když"]
    },
    textId: textAnswersIds.badEventResolution,
    options: [
      {
        text: "OK",
        teleport: ["badEventResolutionAgainstYou"]
      }
    ]
  },
  badEventResolutionAgainstYou: { 
    name: "badEventResolutionAgainstYou",
    text: {
      "en": ["Can the fact, that ", textAnswersIds.badEventResolution, " turn against you?"],
      "cs": ["Může se to, že ", textAnswersIds.badEventResolution, " obrátit proti tobě?"]
    },
    type: qtype.choice,
    options: YesNoOpts(["howBadEventResolutionAgainstYou"])
  },
  howBadEventResolutionAgainstYou: { 
    name: "howBadEventResolutionAgainstYou",
    text: {
      "en": ["How can the fact, that ", textAnswersIds.badEventResolution, " turn against you?"],
      "cs": ["Jak se může to, že ", textAnswersIds.badEventResolution, " obrátit proti tobě?"]
    },
    type: qtype.text,
    textId: textAnswersIds.badEventResolutionWrong,
    options: [
      {
        text: "OK",
        teleport: ["isResolutionWorse"]
      }
    ]
  },
  isResolutionWorse: {
    name: "isResolutionWorse",
    text: {
      "en": "From following options, what is worse?",
      "cs": "Co z následujících možností je horší?"
    },
    options: [
      {
        text: textAnswersIds.badEventResolutionWrong,
        teleport: ["panikKalmPanik"]
      },
      {
        text: textAnswersIds.badEvent,
        teleport: "PANIC"
      },
      {
        text: {
          "en": "Approximately the same",
          "cs": "Přibližně stejně špatné"
        },
        teleport: ["panikKalmPanik"],
        primary: true
      },
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
  },
  
  // ------- REVEAL MEME -------  
  
  human: {
    name: "human",
    type: qtype.text,
    textId: textAnswersIds.human,
    options: [
      {
        teleport: ["whyIsBad"],
        text: "OK"
      }
    ],
    text: {
      cs: "Zadej jméno někoho, nebo skupinu lidí",
      en: "Enter someone's name or some group of people"
    }
  },
  whyIsBad: {
    name: "whyIsBad",
    type: qtype.text,
    options: TextOpts(["whoHasBadProp"]),
    text: {
      cs: ["Jakými negativními vlastnostmi trpí ", textAnswersIds.human, "?"],
      en: ["Which bad properties does ", textAnswersIds.human, " have?"]
    },
    placeholder: {
      "en": "In form of adjective",
      "cs": "Ve formě přídavného jména"
    },
    textId: textAnswersIds.badProp
  },
  whoHasBadProp: {
    name: "revealMeme",
    type: qtype.text,
    options: [
      {
        teleport: ["revealMeme"],
        text: "OK"
      }
    ],
    text: {
      cs: ["Jak se říká lidem, kteří jsou ", textAnswersIds.badProp, "?"],
      en: ["How are ", textAnswersIds.badProp, " people called?"]
    },
    textId: textAnswersIds.whoIsBad
  },
  revealMeme: { 
    name: "revealMeme",
    type: qtype.meme,
    template: "reveal",
    content: [
      textAnswersIds.human,
      "Let's see who you really are...",
      textAnswersIds.whoIsBad,
      "I knew it!"
    ]
  },
  
  // ------- DOG MEME -------
  
  misconception: {
    name: "misconception",
    type: qtype.text,
    options: TextOpts(["spreadsSomeoneChaos"]),
    text: {
      cs: "Zadej rozšířenou lež.",
      en: "Enter some common misconception."
    },
    textId: textAnswersIds.misconception
  },  
  spreadsSomeoneChaos: {
    name: "spreadsSomeoneChaos",
    type: qtype.choice,
    options: YesNoOpts(["whoSpreadsChaos"]),
    text: {
      cs: ["Šíří to, že ", textAnswersIds.misconception, " nějaký specifický člověk / skupina lidí?"],
      en: ["Spreads the lie, that ", textAnswersIds.misconception, " some specific human / group of people?"]
    },
  },
  whoSpreadsChaos: {
    name: "whoSpreadsChaos",
    type: qtype.text,
    options: [
      {
        teleport: ["whoKnowsTruth", "profKnowsTruth"],
        text: "OK"
      }
    ],
    text: {
      cs: ["Kdo šíří to, že ", textAnswersIds.misconception, "?"],
      en: ["Who spreads the lie, that ", textAnswersIds.misconception, "?"]
    },
    textId: textAnswersIds.whoSpreadsChaos
  },
  profKnowsTruth: {
    name: "profKnowsTruth",
    type: qtype.text,
    options: TextOpts(["dogMeme"]),
    text: {
      cs: ["Která profese se zabývá problematikou související s vyvracením toho, že ", textAnswersIds.misconception, "?"],
      en: ["Which profession deals with the issue of refuting the fact that ", textAnswersIds.misconception, "?"]
    },
    textId: textAnswersIds.whoKnowsTruth
  },
  whoKnowsTruth: {
    name: "whoKnowsTruth",
    type: qtype.text,
    options: TextOpts(["dogMeme"]),
    placeholder: {
      cs: "Třeba aktivista, skupina aktivistů, instituce...",
      en: "Eg. activist, group of activists, institution..."
    },
    text: {
      cs: ["Kdo bojuje proti šíření toho, že ", textAnswersIds.misconception, "?"],
      en: ["Who fights against spreading the lie, that ", textAnswersIds.misconception, "?"]
    },
    textId: textAnswersIds.whoKnowsTruth
  },
  dogMeme: { 
    name: "dogMeme",
    type: qtype.meme,
    template: "mouth",
    content: [
      [
        textAnswersIds.whoSpreadsChaos, 
        {
          en: " explaining, that ", 
          cs: " vysvětlující, že " 
        },
        textAnswersIds.misconception
      ],
      {
        en: "Interested people",
        cs: "Zaujatí lidé"
      },
      textAnswersIds.whoKnowsTruth,
    ]
  },
}
