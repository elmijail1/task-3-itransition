// General
const { inputReader } = require("./utilities/inputReader.js");
const { processInitInput } = require("./functions/processInitInput.js");
const { removeChosenDie } = require("./utilities/removeChosenDie.js");
// For question 1
const determineWhoRollsFirst = require("./functions/determineWhoRollsFirst.js");
// For question 2
const { chooseADie } = require("./functions/chooseADie.js");
// For questions 3-4
const { generateAProof } = require("./functions/generateAProof.js");
const { rollADie } = require("./functions/rollADie.js");
// For the final section
const { determineWinner } = require("./functions/determineWinner.js");
// HMAC & key
const {
  calculateSecureRandom,
} = require("./utilities/calculateSecureRandom.js");
// the help table
const { createTable } = require("./createTable.js");

let dice = processInitInput(process.argv);
let probTable = createTable(dice);

// function removeChosenDie(die) {
//   dice = dice.filter((d) => d.initialIndex !== die.initialIndex);
//   return dice;
// }

// prog chooses a random die and it's removed from the dice
function chooseARandomDie() {
  const randomDie = dice[Math.floor(Math.random() * dice.length)];
  console.log(`I chose this die: ${randomDie.die}.
`);
  return randomDie;
}

// * * * * *

// The main function
async function main() {
  // Section 1: Who moves first?
  const progsSecretNum = calculateSecureRandom(2);

  try {
    var playersGuess = await determineWhoRollsFirst(
      inputReader,
      progsSecretNum,
      probTable
    );
  } catch (error) {
    console.error(error);
    process.exit();
  }

  let firstRoller;
  let firstRollerPronoun;
  let secondRoller;
  let secondRollerPronoun;

  function firstToRoll() {
    if (playersGuess === progsSecretNum.randomNumber) {
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
Your selection: ${playersGuess}
My selection: ${progsSecretNum.randomNumber}
(KEY = ${progsSecretNum.secureKey})

Hence, first to choose a die and then roll is ${firstToRoll()}!
`);

  async function doPlayerRoll() {
    try {
      var diePlayer = await chooseADie(inputReader, dice, probTable);
      console.log(`You chose this die: ${diePlayer.die}
      `);
      return diePlayer;
    } catch (error) {
      console.error(error);
      process.exit();
    }
  }

  // Section 2: Who rolls which die
  if (firstRoller === "player") {
    var diePlayer = await doPlayerRoll();
    dice = removeChosenDie(dice, diePlayer);
    var dieProg = chooseARandomDie();
  } else if (firstRoller === "program") {
    var dieProg = chooseARandomDie();
    dice = removeChosenDie(dice, dieProg);
    var diePlayer = await doPlayerRoll();
  }

  // Section 3: The first roll
  let progsRandomNumForKey = calculateSecureRandom(6);

  if (firstRoller === "player") {
    var firstRollResult = rollADie(diePlayer.die);
  } else if (firstRoller === "program") {
    var firstRollResult = rollADie(dieProg.die);
  }

  try {
    var firstRollProof = await generateAProof(
      inputReader,
      firstRoller,
      progsRandomNumForKey.hmac,
      probTable
    );
    console.log(`
You chose this number: ${firstRollProof}
I chose this number: ${progsRandomNumForKey.randomNumber}
(KEY = ${progsRandomNumForKey.secureKey})
The result is ${firstRollProof} + ${progsRandomNumForKey.randomNumber} = ${
      (Number(firstRollProof) + Number(progsRandomNumForKey.randomNumber)) % 6
    }

${
  firstRollerPronoun[0].toUpperCase() + firstRollerPronoun.slice(1)
} roll is ${firstRollResult}.

`); // display the returned number
  } catch (error) {
    console.error(error);
    process.exit();
  }

  // Section 4: The second rol
  progsRandomNumForKey = calculateSecureRandom(6);

  if (secondRoller === "player") {
    var secondRollResult = rollADie(diePlayer.die);
  } else {
    var secondRollResult = rollADie(dieProg.die);
  }

  try {
    var secondRollProof = await generateAProof(
      inputReader,
      secondRoller,
      progsRandomNumForKey.hmac,
      probTable
    ); // player's part of the proof
    console.log(`
You chose this number: ${secondRollProof}
I chose this number: ${progsRandomNumForKey.randomNumber}
(KEY = ${progsRandomNumForKey.secureKey})
The result is ${secondRollProof} + ${progsRandomNumForKey.randomNumber} = ${
      (Number(secondRollProof) + Number(progsRandomNumForKey.randomNumber)) % 6
    }

${
  secondRollerPronoun[0].toUpperCase() + secondRollerPronoun.slice(1)
} roll is ${secondRollResult}.

`); // display the returned number
  } catch (error) {
    console.error(error);
    process.exit();
  }

  // Final section
  determineWinner(firstRoller, firstRollResult, secondRollResult);

  inputReader.close();
}

main();
