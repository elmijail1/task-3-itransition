// General
const { inputReader } = require("./utilities/inputReader.js");
const { processInitInput } = require("./functions/processInitInput.js");
// For question 1
const determineWhoRollsFirst = require("./functions/determineWhoRollsFirst.js");
// For question 2
const { chooseADie } = require("./functions/chooseADie.js");
// For questions 3-4
const { generateAProof } = require("./functions/generateAProof.js");
const { rollADie } = require("./functions/rollADie.js");
// For the final section
const { determineWinner } = require("./functions/determineWinner.js");

// GET BACK TO:
// 1. BASIC LOGIC
// 1.1. firstRoller must determine who chooses first
// 1.2. firstRoller must determine who rolls first (i.e. Q3 & Q4 can change places)
// 1.3. Make the Exit option work in all CLI menus
// 1.4. Make the Help option work in all CLI menus (no table yet, a PH would do)
// 2. ADD CRAZY STUFF
// 2.1. HMACs & keys (use APIs)
// 2.2. The help table (use APIs)
// 2.3. If there's still some time left, see if you can add OOP to it all somehow

let dice = processInitInput(process.argv);

// prog chooses a random die and it's removed from the dice
function chooseARandomDie() {
  const randomDie = dice[Math.floor(Math.random() * dice.length)];
  dice = dice.filter((die) => die.initialIndex !== randomDie.initialIndex);
  return randomDie;
}

// * * * * *

// M A I N  F U N C T I O N
async function main() {
  const randomNumberFrom0To1 = Math.round(Math.random());
  // initial HMAC calcualtion

  // * * *
  // QUESTION 1
  try {
    var response1 = await determineWhoRollsFirst(inputReader);
  } catch (error) {
    console.error(error);
    process.exit();
  }
  // key calculation
  //   who's first to roll calculation
  let firstRoller;
  let firstRollerPronoun;
  let secondRoller;
  let secondRollerPronoun;

  function firstToRoll() {
    if (Number(response1) === randomNumberFrom0To1) {
      firstRoller = "player";
      firstRollerPronoun = "your";
      secondRoller = "program";
      secondRollerPronoun = "my";
      return "you";
    } else {
      firstRoller = "program";
      firstRollerPronoun = "my";
      secondRoller = "player";
      secondRollerPronoun = "your";
      return "me";
    }
  }

  console.log(`
Your selection: ${response1}
My selection: ${randomNumberFrom0To1}
(KEY = ...)

Hence, first to roll is ${firstToRoll()}!
`);

  let dieProgs = chooseARandomDie();
  console.log(`I chose this die: ${dieProgs.die}.
  `);

  // * *
  // * * *
  // QUESTION 2 SECTION
  try {
    var diePlayers = await chooseADie(inputReader, dice); // the die you've chosen
    console.log(`You chose this die: ${diePlayers.die}
`); // display the chosen die
    dice = dice.filter((die) => die.initialIndex !== diePlayers.initialIndex); // remove the die you've chosen from the dice array
  } catch (error) {
    console.error(error);
    process.exit();
  }

  // * *
  // * * *
  // QUESTION 3 SECTION
  let progsRandomNumForKey = Math.floor(Math.random() * 6);

  if (firstRoller === "player") {
    var firstRollResult = rollADie(diePlayers.die);
  } else {
    var firstRollResult = rollADie(dieProgs.die);
  }

  try {
    var firstRollProof = await generateAProof(inputReader, firstRoller); // player's part of the proof
    console.log(`
You chose this number: ${firstRollProof}
I chose this number: ${progsRandomNumForKey}
(KEY = ...)
The result is ${firstRollProof} + ${progsRandomNumForKey} = ${
      (Number(firstRollProof) + progsRandomNumForKey) % 6
    }

${
  firstRollerPronoun[0].toUpperCase() + firstRollerPronoun.slice(1)
} roll is ${firstRollResult}.

`); // display the returned number
  } catch (error) {
    console.error(error);
    process.exit();
  }

  // * *
  // * * *
  // QUESTION 4 SECTION
  progsRandomNumForKey = Math.floor(Math.random() * 6);

  if (secondRoller === "player") {
    var secondRollResult = rollADie(diePlayers.die);
  } else {
    var secondRollResult = rollADie(dieProgs.die);
  }

  try {
    var secondRollProof = await generateAProof(inputReader, secondRoller); // player's part of the proof
    console.log(`
You chose this number: ${secondRollProof}
I chose this number: ${progsRandomNumForKey}
(KEY = ...)
The result is ${secondRollProof} + ${progsRandomNumForKey} = ${
      (Number(secondRollProof) + progsRandomNumForKey) % 6
    }

${
  secondRollerPronoun[0].toUpperCase() + secondRollerPronoun.slice(1)
} roll is ${secondRollResult}.

`); // display the returned number
  } catch (error) {
    console.error(error);
    process.exit();
  }

  // * *
  // * * *
  // VICTORY SECTION
  determineWinner(firstRoller, firstRollResult, secondRollResult);

  inputReader.close();
}

main();
