// General
const { inputReader } = require("./utilities/inputReader.js");
// For question 1
const determineWhoRollsFirst = require("./functions/determineWhoRollsFirst.js");
// For question 2
const { chooseADie } = require("./functions/chooseADie.js");

if (process.argv.length < 5) {
  console.error(
    "You haven't specified enough dice. Please specify at least 3 dice."
  );
  return;
}
let dice = process.argv.slice(2).map((arg, index) => {
  return { die: arg, initialIndex: index };
});

// prog chooses a random die and it's removed from the dice
function chooseARandomDie() {
  const randomDie = dice[Math.floor(Math.random() * dice.length)];
  dice = dice.filter((die) => die.initialIndex !== randomDie.initialIndex);
  return randomDie;
}

function generateAProof(whoRolls) {
  let rollerPronoun;
  if (whoRolls === "player") {
    rollerPronoun = "you";
  } else {
    rollerPronoun = "me";
  }

  return new Promise((resolve, reject) => {
    inputReader.question(
      `It's time for ${rollerPronoun} to roll.
I selected a random value in the range from 0 to 5.
(HMAC = ...)
Add your number modulo 6:
– Enter "0" for 0
- Enter "1" for 1
- Enter "2" for 2
- Enter "3" for 3
- Enter "4" for 4
- Enter "5" for 5
  - - -
- Enter "x" to exit
- Enter "?" for help
`,
      (answer) => {
        if (["0", "1", "2", "3", "4", "5", "x", "?"].includes(answer)) {
          if (["0", "1", "2", "3", "4", "5"].includes(answer)) {
            resolve(answer);
          } else if (answer === "?") {
            console.log("Help is on the way!");
          } else if (answer === "x") {
            process.exit();
          }
        } else {
          reject(
            "You've entered a non-existant option. Try again: choose among 0, 1, 2, 3, 4, 5, x, and ?."
          );
        }
      }
    );
  });
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
  console.log(response1, randomNumberFrom0To1);

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

  let dieProgs = chooseARandomDie().die;
  console.log(`I chose this die: ${dieProgs}.
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

  function rollADie(die) {
    die = die.split(",");
    return die[Math.floor(Math.random() * die.length)];
  }

  if (firstRoller === "player") {
    var firstRollResult = rollADie(diePlayers.die);
  } else {
    var firstRollResult = rollADie(dieProgs.die);
  }

  try {
    var firstRollProof = await generateAProof(firstRoller); // player's part of the proof
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

  // dieProgs is rolled

  // * *
  // * * *
  // QUESTION 4 SECTION
  // diePlayers is rolled

  // * *
  // * * *
  // VICTORY SECTION
  // resultProgs & resultPlayers are compated and the winner is determined

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

  inputReader.close();
}

main();
