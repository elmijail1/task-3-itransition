// General
const { inputReader } = require("./utilities/inputReader.js");
const { processInitInput } = require("./functions/processInitInput.js");
const { removeChosenDie } = require("./utilities/removeChosenDie.js");
// For section 1
const determineWhoRollsFirst = require("./functions/determineWhoRollsFirst.js");
// For section 2
const { chooseADie } = require("./functions/chooseADie.js");
// For section 3
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
  // let firstRollerPronoun;
  let secondRoller;
  // let secondRollerPronoun;

  function firstToRoll() {
    if (playersGuess === progsSecretNum.randomNumber) {
      firstRoller = { name: "player", pronoun: "your" };
      // firstRollerPronoun = "your";
      secondRoller = { name: "program", pronoun: "my" };
      // secondRollerPronoun = "my";
      return "you";
    } else {
      firstRoller = { name: "program", pronoun: "my" };
      secondRoller = { name: "player", pronoun: "your" };
      // firstRoller = "program";
      // firstRollerPronoun = "my";
      // secondRoller = "player";
      // secondRollerPronoun = "your";
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
      var chosenDie = await chooseADie(inputReader, dice, probTable);
      console.log(`You chose this die: ${chosenDie.die}
      `);
      return chosenDie;
    } catch (error) {
      console.error(error);
      process.exit();
    }
  }

  // Section 2: Who rolls which die
  if (firstRoller.name === "player") {
    var diePlayer = await doPlayerRoll();
    dice = removeChosenDie(dice, diePlayer);
    var dieProg = chooseARandomDie();
  } else if (firstRoller.name === "program") {
    var dieProg = chooseARandomDie();
    dice = removeChosenDie(dice, dieProg);
    var diePlayer = await doPlayerRoll();
  }

  // Section 3: Rolling
  let progsRandomNumForKey;

  async function doRoll(roller) {
    progsRandomNumForKey = calculateSecureRandom(6);
    if (roller.name === "player") {
      var rollResult = rollADie(diePlayer.die);
    } else if (roller.name === "program") {
      var rollResult = rollADie(dieProg.die);
    }

    try {
      var rollProof = await generateAProof(
        inputReader,
        firstRoller,
        progsRandomNumForKey.hmac,
        probTable
      );
      console.log(`
You chose this number: ${rollProof}
I chose this number: ${progsRandomNumForKey.randomNumber}
(KEY = ${progsRandomNumForKey.secureKey})
The result is ${rollProof} + ${progsRandomNumForKey.randomNumber} = ${
        (Number(rollProof) + Number(progsRandomNumForKey.randomNumber)) % 6
      }

${
  roller.pronoun[0].toUpperCase() + roller.pronoun.slice(1)
} roll is ${rollResult}.

`);
    } catch (error) {
      console.error(error);
      process.exit();
    }
    return rollResult;
  }

  const firstRollResult = await doRoll(firstRoller);
  const secondRollResult = await doRoll(secondRoller);

  // Final section
  determineWinner(firstRoller.name, firstRollResult, secondRollResult);

  inputReader.close();
}

main();
